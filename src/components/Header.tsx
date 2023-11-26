import Link from "next/link";
import React from "react";
import styles from "../styles/header.module.css";

const Header = () => {
    return (
            <header className={styles.header}>
                <Link className={styles.logo} href="/"><h1 className={styles.title}>Event Booker</h1></Link>
                <nav className={styles.nav} >
                    <Link className={styles.navItem} href="/">Home</Link>
                </nav>
            </header>
    );
};

export default Header;