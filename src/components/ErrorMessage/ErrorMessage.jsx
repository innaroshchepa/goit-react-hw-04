import css from './ErrorMessage.module.css';

export default function ErrorMessage({ children }) {
  return <div className={css.error}>{children}</div>;
}