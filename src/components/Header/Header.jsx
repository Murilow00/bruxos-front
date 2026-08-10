import Image from 'next/image';
import styles from './Header.module.css';

export default function Header({
    title = 'WizardDex',
    subtitle = 'Explorando o mundo mágico',
    totalProducts,
}) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.brand}>
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
                </div>

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
