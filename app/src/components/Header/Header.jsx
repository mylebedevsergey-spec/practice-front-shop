import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/slices/cartSlice';
import styles from './Header.module.css';

export default function Header() {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>Сад и Огород</Link>
        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : styles.link)}>Главная</NavLink>
          <NavLink to="/categories" className={({ isActive }) => (isActive ? styles.active : styles.link)}>Категории</NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? styles.active : styles.link)}>Корзина</NavLink>
        </nav>
        <Link to="/cart" className={styles.cart}>
          Корзина
          <span className={styles.badge}>{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}
