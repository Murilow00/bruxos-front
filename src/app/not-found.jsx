import styles from './not-found.module.css';
import Link from "next/link";
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <div className={styles.background}>
                <div className={styles.background2}>
                    <Image
                        src="/images/logo-escola.png"
                        alt="Logo da escola"
                        width={200}
                        height={100}
                        priority
                        className={styles.logo}
                    />
                    <div className={styles.container}>
                        <h1 className={styles.titulo}>Infelizmente a página não foi encontrada </h1>
                    </div>
                    <div className={styles.volta}>
                        <Link href="/" className={styles.link}>
                            Voltar para a home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}