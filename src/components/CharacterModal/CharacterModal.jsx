'use client';

import Image from 'next/image';
import styles from './CharacterModal.module.css';

export default function CharacterModal({
    isOpen,
    character,
    onClose,
    onFavoriteClick,
    isFavorited,
}) {
    if (!isOpen || !character) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>

                <div className={styles.modalContent}>
                    <div className={styles.imageSection}>
                        <Image
                            src={character.image || '/images/placeholder.png'}
                            alt={character.name}
                            width={300}
                            height={400}
                            priority
                            className={styles.modalImage}
                        />
                    </div>

                    <div className={styles.infoSection}>
                        <h2 className={styles.modalTitle}>{character.name}</h2>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Casa:</span>
                                <span className={styles.value}>
                                    {character.house || 'Desconhecida'}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Espécie:</span>
                                <span className={styles.value}>
                                    {character.species || 'Não informado'}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Patrono:</span>
                                <span className={styles.value}>
                                    {character.patronus || 'Desconhecido'}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Ator/Atriz:</span>
                                <span className={styles.value}>
                                    {character.actor || 'Não informado'}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Cor dos Olhos:</span>
                                <span className={styles.value}>
                                    {character.eyeColour || 'Não informado'}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Cor do Cabelo:</span>
                                <span className={styles.value}>
                                    {character.hairColour || 'Não informado'}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Data de Nascimento:</span>
                                <span className={styles.value}>
                                    {character.dateOfBirth || 'Desconhecida'}
                                </span>
                            </div>

                            <div className={styles.infoItem}>
                                <span className={styles.label}>Situação:</span>
                                <span
                                    className={`${styles.value} ${
                                        character.alive ? styles.alive : styles.dead
                                    }`}
                                >
                                    {character.alive ? '✅ Vivo' : '☠️ Morto'}
                                </span>
                            </div>
                        </div>

                        <button
                            className={`${styles.modalFavoriteBtn} ${
                                isFavorited ? styles.favorited : ''
                            }`}
                            onClick={() => onFavoriteClick(character)}
                        >
                            {isFavorited ? '❤️' : '🤍'} {isFavorited ? 'Favoritado' : 'Favoritar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
