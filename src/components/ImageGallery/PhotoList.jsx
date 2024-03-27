import css from './PhotoList.module.css';
import PhotoCard from './ImageCard/PhotoCard';

export default function PhotoList({ photos, openModal }) {
  return (
    <ul className={css.photoList}>
      {photos.map(photo => (
        <li key={photo.id}>
          <PhotoCard photo={photo} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}