import Header from '@/components/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Sobre() {
    const integrantes = [
        { nome: 'Murilo', foto: '/images/murilo.png' },
        { nome: 'Daniel', foto: '/images/daniel.png' },
    ];
    const professores = ['Marcelo', 'Thiago'];

    return (
        <>
            <Header title="Sobre" subtitle="Conheça nosso projeto" />
            <main className={styles.container}>
                <section className={styles.secao}>
                    <h2 className={styles.titulo}>Sobre o Projeto WizardDex</h2>
                    <p className={styles.texto}>
                        A WizardDex é uma enciclopédia digital interativa dos personagens do universo
                        Harry Potter. Este projeto foi desenvolvido como desafio prático da disciplina
                        de Front-End, aplicando os conceitos mais modernos de desenvolvimento web com
                        Next.js e React.
                    </p>
                </section>

                <section className={styles.secao}>
                    <h3 className={styles.subtitulo}>📚 Informações da Turma</h3>
                    <div className={styles.info}>
                        <p>
                            <strong>Turma:</strong> 2TDS1
                        </p>
                        <p>
                            <strong>Curso:</strong> Técnico em Desenvolvimento de Sistemas
                        </p>
                    </div>
                </section>

                <section className={styles.secao}>
                    <h3 className={styles.subtitulo}>👨‍🏫 Professores</h3>
                    <ul className={styles.lista}>
                        {professores.map((prof) => (
                            <li key={prof} className={styles.itemLista}>
                                {prof}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.secao}>
                    <h3 className={styles.subtitulo}>👥 Integrantes do Grupo</h3>
                    <div className={styles.galeriaIntegrantes}>
                        {integrantes.map((integrante) => (
                            <div key={integrante.nome} className={styles.cardIntegrante}>
                                <div className={styles.fotoWrapper}>
                                    <Image
                                        src={integrante.foto}
                                        alt={integrante.nome}
                                        width={200}
                                        height={250}
                                        className={styles.fotoIntegrante}
                                    />
                                </div>
                                <h4 className={styles.nomeIntegrante}>{integrante.nome}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.secao}>
                    <h3 className={styles.subtitulo}>🛠️ Tecnologias Utilizadas</h3>
                    <div className={styles.tecnologias}>
                        <span className={styles.tech}>Next.js</span>
                        <span className={styles.tech}>React</span>
                        <span className={styles.tech}>Axios</span>
                        <span className={styles.tech}>React Hot Toast</span>
                        <span className={styles.tech}>CSS Modules</span>
                    </div>
                </section>

                <div className={styles.navegacao}>
                    <Link href="/personagens" className={styles.botao}>
                        ← Ir para Personagens
                    </Link>
                    <Link href="/" className={styles.botao}>
                        Voltar para Home →
                    </Link>
                </div>
            </main>
        </>
    );
}
