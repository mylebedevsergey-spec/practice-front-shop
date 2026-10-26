import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadCategoryProducts, loadCategories } from '../../store/slices/categoriesSlice';
import ProductCard from '../../components/ProductCard';
import styles from './CategoryPage.module.css';

/** Страница категории: /categories/:id, динамический маршрут. */
export default function CategoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, productsStatus, items: categories } = useSelector((state) => state.categories);
  const category = categories.find((item) => String(item.id) === String(id));

  useEffect(() => {
    if (!categories.length) dispatch(loadCategories());
    dispatch(loadCategoryProducts(id));
  }, [dispatch, id, categories.length]);

  return (
    <section className={styles.wrap}>
      <Link to="/categories" className={styles.back}>← Все категории</Link>
      <h1>{category ? category.title : 'Категория'}</h1>

      {productsStatus === 'loading' && <p className={styles.muted}>Загружаем товары…</p>}
      {productsStatus === 'succeeded' && (
        products.length
          ? <div className={styles.grid}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          : <p className={styles.muted}>В этой категории пока нет товаров.</p>
      )}
    </section>
  );
}
