import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../../store/slices/categoriesSlice';
import CategoryCard from '../../components/CategoryCard';
import styles from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  useEffect(() => { dispatch(loadCategories()); }, [dispatch]);

  return (
    <section className={styles.wrap}>
      <h1>Категории</h1>
      {status === 'loading' && <p className={styles.muted}>Загружаем…</p>}
      {status === 'failed' && <p className={styles.error}>Ошибка: {error}</p>}
      <div className={styles.grid}>
        {items.map((category) => <CategoryCard key={category.id} category={category} />)}
      </div>
    </section>
  );
}
