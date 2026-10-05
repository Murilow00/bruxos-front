'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import Link from 'next/link';
import toast from 'react-hot-toast';
import styles from './page.module.css';

const getCharacterRouteId = (character) => String(character.id || character.name);

export default function Favoritos() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        try {
            const savedFavorites = JSON.parse(sessionStorage.getItem('favoriteCharacters') || '[]');
            setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
        } catch (error) {
            console.error('Erro ao carregar favoritos:', error);
            setFavorites([]);
        }
    }, []);

    const handleRemoveFavorite = (character) => {
        const updatedFavorites = favorites.filter(
            (favorite) => getCharacterRouteId(favorite) !== getCharacterRouteId(character)
        );
        setFavorites(updatedFavorites);
        sessionStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavorites));
        toast.success(`${character.name} removido dos favoritos!`);
    };

    return (
        <>
            <Header title="Favoritos" subtitle="Seus personagens escolhidos" />
            <main className={styles.container}>
                <div className={styles.heading}>
                    <h2>Personagens favoritos</h2>
                    <span>{favorites.length} salvos nesta sessão</span>
                </div>

                {favorites.length > 0 ? (
                    <div className={styles.grid}>
                        {favorites.map((character) => (
                            <CharacterCard
                                key={getCharacterRouteId(character)}
                                character={character}
                                detailsHref={`/favoritos/${encodeURIComponent(getCharacterRouteId(character))}`}
                                onFavoriteClick={handleRemoveFavorite}
                                isFavorited
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>Você ainda não favoritou nenhum personagem.</p>
                        <Link href="/personagens" className={styles.browseLink}>
                            Explorar personagens
                        </Link>
                    </div>
                )}
            </main>
        </>
    );
}