import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendSaleRequest } from '../../api/endpoints';
import styles from './SaleForm.module.css';

/** Форма заявки на скидку (react-hook-form + валидация + POST /sale/send). */
export default function SaleForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      await sendSaleRequest({ name: data.name, phone: data.phone, email: data.email });
      setStatus({ type: 'ok', text: 'Заявка отправлена! Скидка 5% придёт на почту.' });
      reset();
    } catch (error) {
      setStatus({ type: 'error', text: `Не удалось отправить заявку: ${error.message}` });
    }
  };

  return (
    <section className={styles.wrap}>
      <div>
        <h2 className={styles.title}>Скидка 5% на первый заказ</h2>
        <p className={styles.text}>Оставьте контакты, пришлём промокод и подборку для вашего сада.</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <input placeholder="Имя" {...register('name', { required: 'Укажите имя', minLength: { value: 2, message: 'Минимум 2 символа' } })} />
        {errors.name && <em className={styles.error}>{errors.name.message}</em>}

        <input placeholder="Телефон" type="tel" {...register('phone', { required: 'Укажите телефон', pattern: { value: /^\+?[\d\s()-]{10,}$/, message: 'Неверный формат телефона' } })} />
        {errors.phone && <em className={styles.error}>{errors.phone.message}</em>}

        <input placeholder="E-mail" type="email" {...register('email', { required: 'Укажите e-mail', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Неверный e-mail' } })} />
        {errors.email && <em className={styles.error}>{errors.email.message}</em>}

        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Отправляем…' : 'Получить скидку'}</button>
        {status && <p className={status.type === 'ok' ? styles.ok : styles.fail}>{status.text}</p>}
      </form>
    </section>
  );
}
