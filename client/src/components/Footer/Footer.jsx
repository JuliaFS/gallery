import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles["footer-page"]}>
            <p>Author: Julia</p>
            <p><a href="mailto:yuliya.f.s@gmail.com">yuliya.f.s@gmail.com</a></p>
        </footer>
    );
}