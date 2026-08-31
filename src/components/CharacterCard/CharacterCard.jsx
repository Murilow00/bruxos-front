'use client';

import Image from 'next/image';
import styles from './CharacterCard.module.css';

export default function CharacterCard({
    character,
    onCardClick,
    onFavoriteClick,
    isFavorited,
}) {
    const placeholderSvg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="350"%3E%3Crect fill="%23e0e0e0" width="250" height="350"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23999"%3ESem imagem%3C/text%3E%3C/svg%3E';

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={character.image || placeholderSvg}
                    alt={character.name}
                    width={250}
                    height={350}
                    priority
                    className={styles.image}
                />
                <div className={styles.overlay} onClick={() => onCardClick(character)}>
                    <button className={styles.viewMoreBtn}>Ver Detalhes</button>
                </div>
            </div>

            <div className={styles.content}>
                <h3 className={styles.name}>{character.name}</h3>
                <p className={styles.house}>
                    <strong>Casa:</strong>{' '}
                    {character.house || 'Desconhecida'}
                </p>
                <p className={styles.actor}>
                    <strong>Ator:</strong> {character.actor || 'Não informado'}
                </p>

                <button
                    className={`${styles.favoriteBtn} ${isFavorited ? styles.favorited : ''}`}
                    onClick={() => onFavoriteClick(character)}
                    title={isFavorited ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
                >
                    {isFavorited ? '❤️' : '🤍'} {isFavorited ? 'Favoritado' : 'Favoritar'}
                </button>
            </div>
        </div>
    );
}
