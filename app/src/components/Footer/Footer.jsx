import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>© 2026 Сад и Огород, учебный проект (React, Redux Toolkit, React Router, react-hook-form)</p>
        <p className={styles.contacts}>Москва, ул. Садовая, 12 · +7 (495) 000-00-00</p>
      </div>
    </footer>
  );
}
