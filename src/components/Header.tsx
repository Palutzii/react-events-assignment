import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
    return (
            <header className="header">
                <h1 className="header-title">Event Booker</h1>
                <nav className="header-nav">
                    <Link className="header-nav-item" href="/">Home</Link>
                    <Link className="header-nav-item" href="/events">Events</Link>
                    <Link className="header-nav-item" href="/tickets">Buy tickets</Link>
                </nav>
            </header>
    );
};

export default Header;