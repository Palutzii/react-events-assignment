import Link from "next/link";
import React from "react";
import styles from "../styles/header.module.css";

const Header = () => {
    return (
            <header className={styles.header}>
                <h1 className={styles.title}>Event Booker</h1>
                <nav className={styles.nav} >
                    <Link className={styles.navItem} href="/">Home</Link>
                </nav>
            </header>
    );
};

export default Header;