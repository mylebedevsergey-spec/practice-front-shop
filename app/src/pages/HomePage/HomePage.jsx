import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts } from '../../store/slices/productsSlice';
import { loadCategories } from '../../store/slices/categoriesSlice';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import SaleForm from '../../components/SaleForm';
import styles from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
  }, [dispatch]);

  const saleProducts = products.filter((product) => product.discont_price != null).slice(0, 4);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.badge}>Сезон 2026</span>
          <h1>Всё для сада и подоконника</h1>
          <p>Инструменты, растения и уход с доставкой за 1–2 дня. Более 35 позиций в каталоге.</p>
          <Link to="/categories" className={styles.cta}>Смотреть каталог</Link>
        </div>
        <div className={styles.heroCard}>
          <strong>5</strong><span>категорий</span>
          <strong>35</strong><span>товаров</span>
          <strong>−50%</strong><span>максимальная скидка</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Категории</h2>
          <Link to="/categories" className={styles.more}>Все категории</Link>
        </div>
        <div className={styles.categories}>
          {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Распродажа</h2>
          <Link to="/categories" className={styles.more}>Все товары</Link>
        </div>
        {status === 'loading' && <p className={styles.muted}>Загружаем товары…</p>}
        {status === 'failed' && <p className={styles.error}>Ошибка загрузки: {error}</p>}
        {status === 'succeeded' && (
          <div className={styles.grid}>
            {saleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>

      <section className={styles.promo}>
        <div>
          <h2>Скидки до 50% на садовые растения</h2>
          <p>Успейте до конца месяца, количество ограничено.</p>
        </div>
        <button type="button" className={styles.promoBtn} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          К распродаже
        </button>
      </section>

      <SaleForm />

      <section className={styles.contacts}>
        <div className={styles.contactsText}>
          <h2>Контакты</h2>
          <p>Москва, ул. Садовая, 12</p>
          <p>Ежедневно с 9:00 до 21:00</p>
          <p>+7 (495) 000-00-00</p>
        </div>
        <div className={styles.map} role="img" aria-label="Карта: Москва, улица Садовая, 12">
          <span>Садовая, 12</span>
        </div>
      </section>
    </>
  );
}
