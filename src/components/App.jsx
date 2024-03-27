import { useState, useEffect } from 'react';
import { fetchPhotos } from '../photos-api';
import SearchBar from './SearchBar/SearchBar';
import PhotoList from './ImageGallery/PhotoList';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ModalWindow from './ImageModal/ModalWindow';

import './App.module.css'

export default function App() { 
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const getPhotos = async () => {
      if (query === '') return;
      try {
        setIsLoading(true);
        const { results, total_pages } = await fetchPhotos({ query, page });

        if (!results.length) {
          setIsEmpty(true);
          return;
        }

        setPhotos(prevPhotos => [...prevPhotos, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
  }, [query, page]);

  const handleSearch = value => {
    if (value === query) return;
    setPhotos([]);
    setPage(1);
    setIsError(false);
    setQuery(value);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = values => {
    setSelectedPhoto(values);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setSelectedPhoto({});
    setIsOpenModal(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage message={'Error! Reload page!'} />}
      {photos.length !== 0 && (
        <PhotoList photos={photos} openModal={openModal} />
      )}
      {isEmpty && query && (
        <ErrorMessage>No results..</ErrorMessage>
      )}
      {isVisible && (
        <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading' : 'Load more'}
        </LoadMoreBtn>
      )}
      {isLoading && <Loader />}
      <ModalWindow
        isOpen={isOpenModal}
        modal={selectedPhoto}
        closeModal={closeModal}
      />
    </div>
  );
}
