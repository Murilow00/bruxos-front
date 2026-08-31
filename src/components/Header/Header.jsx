'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';
import TemaComponent from "./TemaComponent";

export default function Header({
    title = 'WizardDex',
    subtitle = 'Explorando o mundo mágico',
    totalProducts,
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/images/escola.png"
                            alt="Logo da escola"
                            width={90}
                            height={90}
                            priority
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.textGroup}>
                        <h1 className={styles.title}>{title}</h1>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                </Link>

                <button
                    className={styles.menuToggle}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
                    <Link href="/" className={styles.navLink}>
                        🏠 Home
                    </Link>
                    <Link href="/personagens" className={styles.navLink}>
                        🧙 Personagens
                    </Link>
                    <Link href="/sobre" className={styles.navLink}>
                        ℹ️ Sobre
                    </Link>
                </nav>

                <TemaComponent />

                {totalProducts !== undefined && (
                    <div className={styles.badge}>
                        <span className={styles.badgeLabel}>Produtos:</span>
                        <span className={styles.badgeValue}>{totalProducts}</span>
                    </div>
                )}
            </div>
        </header>
    );
}


