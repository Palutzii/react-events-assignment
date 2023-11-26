import React from "react";
import styles from "../styles/footer.module.css";

const Footer = () => {
    return (
            <footer className={styles.footer}>
                <p className={styles.copy}>&copy; {new Date().getFullYear()} Event Booker</p>
            </footer>
    );
};

export default Footer;