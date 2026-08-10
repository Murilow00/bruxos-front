import Header from '../components/Header/Header';
import styles from './page.module.css';

const technologies = ['Next.js', 'React', 'Magias', 'Casas'];

export default function Home() {
    return (
        <main className={styles.pagina}>
            <Header title="WizardDex" subtitle="Explorando o mundo mágico" />

            <section className={styles.heroPrincipal}>
                <div className={styles.conteudoHero}>
                    <p className={styles.rotulo}>Início • Harry Potter</p>
                    <h1 className={styles.titulo}>Descubra a magia em uma experiência digital</h1>
                    <p className={styles.descricao}>
                        A WizardDex é um projeto front-end criado para reunir informações sobre o
                        universo de Harry Potter em uma interface encantadora, intuitiva e inspirada
                        no mundo bruxo.
                    </p>

                    <div className={styles.listaTecnologias}>
                        {technologies.map((tech) => (
                            <span key={tech} className={styles.chipTecnologia}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.cartaoImagem}>
                    <img
                        src="https://casasavendaorlando.com.br/wp-content/uploads/conheca-hogwarts-no-parque-do-harry-potter-em-orlando.jpeg.webp"
                        alt="Imagem da escola de Hogwarts"
                        className={styles.imagemHero}
                    />
                </div>
            </section>

            <section className={styles.gradeInformacoes}>
                <article className={styles.cartao}>
                    <h3>Sobre o projeto</h3>
                    <p>
                        Este projeto é uma atividade para revisar e ampliar os conhecimentos da
                        nossa turma de 2TDS1, unindo criatividade, tecnologia e o universo mágico de
                        Harry Potter.
                    </p>
                </article>

                <article className={styles.cartao}>
                    <h3>Objetivo</h3>
                    <p>
                        O foco desta atividade é combinar a tecnologia do Next.js e React com a
                        magia e a imaginação de Harry Potter em uma experiência visual envolvente.
                    </p>
                </article>
            </section>
        </main>
    );
}
