import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { imageUrl } from '../../api/client';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const hasDiscount = product.discont_price != null;

  return (
    <article className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.media}>
        {hasDiscount && (
          <span className={styles.sale}>
            -{Math.round((1 - product.discont_price / product.price) * 100)}%
          </span>
        )}
        <img src={imageUrl(product.image)} alt={product.title} loading="lazy" />
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <div className={styles.prices}>
          {hasDiscount ? (
            <>
              <span className={styles.price}>{product.discont_price} $</span>
              <span className={styles.old}>{product.price} $</span>
            </>
          ) : (
            <span className={styles.price}>{product.price} $</span>
          )}
        </div>
        <button type="button" className={styles.add} onClick={() => dispatch(addToCart(product))}>
          В корзину
        </button>
      </div>
    </article>
  );
}
