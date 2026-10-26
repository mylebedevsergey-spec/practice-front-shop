import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { imageUrl } from '../../api/client';
import styles from './ProductPage.module.css';

/** Карточка товара: /products/:id */
export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: product, currentStatus } = useSelector((state) => state.products);

  useEffect(() => { dispatch(loadProductById(id)); }, [dispatch, id]);

  if (currentStatus === 'loading') return <p className={styles.muted}>Загружаем товар…</p>;
  if (currentStatus === 'failed' || !product) return <p className={styles.error}>Товар не найден. <Link to="/categories">В каталог</Link></p>;

  const hasDiscount = product.discont_price != null;

  return (
    <section className={styles.wrap}>
      <Link to="/categories" className={styles.back}>← Назад в каталог</Link>
      <div className={styles.layout}>
        <div className={styles.media}>
          <img src={imageUrl(product.image)} alt={product.title} />
        </div>
        <div className={styles.info}>
          <h1>{product.title}</h1>
          <div className={styles.prices}>
            {hasDiscount ? (
              <>
                <span className={styles.price}>{product.discont_price} $</span>
                <span className={styles.old}>{product.price} $</span>
                <span className={styles.badge}>выгодно</span>
              </>
            ) : (
              <span className={styles.price}>{product.price} $</span>
            )}
          </div>
          <p className={styles.description}>{product.description}</p>
          <button type="button" className={styles.add} onClick={() => dispatch(addToCart(product))}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </section>
  );
}
