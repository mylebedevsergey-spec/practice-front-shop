import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../../api/endpoints';
import { clearCart, selectCartItems, selectCartTotal } from '../../store/slices/cartSlice';
import styles from './OrderForm.module.css';

/** Оформление заказа: react-hook-form + POST /order/send, очистка корзины при успехе. */
export default function OrderForm() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    setMessage(null);
    try {
      await sendOrder({
        name: data.name,
        phone: data.phone,
        email: data.email,
        comment: data.comment || '',
        items: items.map((item) => ({ id: item.id, count: item.count })),
        total,
      });
      setMessage({ type: 'ok', text: 'Заказ оформлен! Мы свяжемся с вами в течение дня.' });
      dispatch(clearCart());
      reset();
    } catch (error) {
      setMessage({ type: 'error', text: `Ошибка оформления: ${error.message}` });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Оформление заказа</h2>

      <label className={styles.field}>
        <span>Имя и фамилия</span>
        <input {...register('name', { required: 'Укажите имя' })} />
        {errors.name && <em className={styles.error}>{errors.name.message}</em>}
      </label>

      <label className={styles.field}>
        <span>Телефон</span>
        <input type="tel" {...register('phone', { required: 'Укажите телефон', pattern: { value: /^\+?[\d\s()-]{10,}$/, message: 'Неверный формат' } })} />
        {errors.phone && <em className={styles.error}>{errors.phone.message}</em>}
      </label>

      <label className={styles.field}>
        <span>E-mail</span>
        <input type="email" {...register('email', { required: 'Укажите e-mail', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Неверный e-mail' } })} />
        {errors.email && <em className={styles.error}>{errors.email.message}</em>}
      </label>

      <label className={styles.field}>
        <span>Комментарий</span>
        <textarea rows="3" {...register('comment')} />
      </label>

      <div className={styles.total}>Итого: <strong>{total.toFixed(2)} $</strong></div>
      <button type="submit" disabled={isSubmitting || !items.length}>{isSubmitting ? 'Отправляем…' : 'Оформить заказ'}</button>
      {message && <p className={message.type === 'ok' ? styles.ok : styles.fail}>{message.text}</p>}
    </form>
  );
}
