import { Link } from 'react-router-dom';
import { imageUrl } from '../../api/client';
import styles from './CategoryCard.module.css';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category.id}`} className={styles.card}>
      <img src={imageUrl(category.image)} alt={category.title} loading="lazy" />
      <span className={styles.title}>{category.title}</span>
    </Link>
  );
}
