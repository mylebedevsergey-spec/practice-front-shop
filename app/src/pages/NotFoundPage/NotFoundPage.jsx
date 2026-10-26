import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={styles.wrap}>
      <h1>404</h1>
      <p>Такой страницы нет.</p>
      <Link to="/">На главную</Link>
    </section>
  );
}
