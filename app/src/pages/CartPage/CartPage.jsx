import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeCount, removeFromCart, selectCartItems, selectCartTotal } from '../../store/slices/cartSlice';
import OrderForm from '../../components/OrderForm';
import { imageUrl } from '../../api/client';
import styles from './CartPage.module.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <section className={styles.wrap}>
      <h1>Корзина</h1>

      {!items.length ? (
        <p className={styles.empty}>Корзина пуста. <Link to="/categories">Перейти в каталог</Link></p>
      ) : (
        <div className={styles.layout}>
          <div className={styles.list}>
            {items.map((item) => (
              <article key={item.id} className={styles.row}>
                <img src={imageUrl(item.image)} alt={item.title} className={styles.thumb} />
                <div className={styles.rowInfo}>
                  <Link to={`/products/${item.id}`} className={styles.title}>{item.title}</Link>
                  <span className={styles.price}>{item.price} $</span>
                </div>
                <div className={styles.counter}>
                  <button type="button" onClick={() => dispatch(changeCount({ id: item.id, count: item.count - 1 }))} aria-label="Меньше">−</button>
                  <span>{item.count}</span>
                  <button type="button" onClick={() => dispatch(changeCount({ id: item.id, count: item.count + 1 }))} aria-label="Больше">+</button>
                </div>
                <div className={styles.sum}>{(item.price * item.count).toFixed(2)} $</div>
                <button type="button" className={styles.remove} onClick={() => dispatch(removeFromCart(item.id))} aria-label="Удалить">✕</button>
              </article>
            ))}
            <div className={styles.totalRow}>
              <span>Итого</span>
              <strong>{total.toFixed(2)} $</strong>
            </div>
          </div>

          <OrderForm />
        </div>
      )}
    </section>
  );
}
