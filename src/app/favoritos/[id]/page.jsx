'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

const getCharacterRouteId = (character) => String(character.id || character.name);
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%23e0e0e0" width="300" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23999"%3ESem imagem%3C/text%3E%3C/svg%3E';

export default function FavoritoPorId() {
    const { id } = useParams();
    const router = useRouter();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const savedFavorites = JSON.parse(sessionStorage.getItem('favoriteCharacters') || '[]');
            const favorite = Array.isArray(savedFavorites)
                ? savedFavorites.find((item) => getCharacterRouteId(item) === String(id))
                : null;
            setCharacter(favorite || null);
        } catch (error) {
            console.error('Erro ao buscar favorito:', error);
            setCharacter(null);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const handleRemoveFavorite = () => {
        const savedFavorites = JSON.parse(sessionStorage.getItem('favoriteCharacters') || '[]');
        const updatedFavorites = savedFavorites.filter(
            (favorite) => getCharacterRouteId(favorite) !== getCharacterRouteId(character)
        );
        sessionStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavorites));
        toast.success(`${character.name} removido dos favoritos!`);
        router.push('/favoritos');
    };

    return (
        <>
            <Header title="Favoritos" subtitle="Detalhes do personagem" />
            <main className={styles.container}>
                <Link href="/favoritos" className={styles.backLink}>
                    ← Voltar para favoritos
                </Link>

                {loading ? (
                    <p className={styles.message} role="status">Carregando personagem...</p>
                ) : character ? (
                    <article className={styles.detail}>
                        <div className={styles.imageFrame}>
                            <Image
                                src={character.image || placeholderImage}
                                alt={character.name}
                                width={360}
                                height={480}
                                unoptimized={character.id?.startsWith('custom-')}
                                priority
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.info}>
                            <p className={styles.eyebrow}>Personagem favorito</p>
                            <h2>{character.name}</h2>
                            <dl className={styles.facts}>
                                <div><dt>Casa</dt><dd>{character.house || 'Desconhecida'}</dd></div>
                                <div><dt>Espécie</dt><dd>{character.species || 'Não informada'}</dd></div>
                                <div><dt>Patrono</dt><dd>{character.patronus || 'Desconhecido'}</dd></div>
                                <div><dt>Ator/Atriz</dt><dd>{character.actor || 'Não informado'}</dd></div>
                                <div><dt>Cor dos olhos</dt><dd>{character.eyeColour || 'Não informada'}</dd></div>
                                <div><dt>Cor do cabelo</dt><dd>{character.hairColour || 'Não informada'}</dd></div>
                                <div><dt>Data de nascimento</dt><dd>{character.dateOfBirth || 'Desconhecida'}</dd></div>
                                <div><dt>Situação</dt><dd>{character.alive ? 'Vivo' : 'Morto'}</dd></div>
                            </dl>
                            <button
                                type="button"
                                className={styles.removeButton}
                                onClick={handleRemoveFavorite}
                            >
                                Remover dos favoritos
                            </button>
                        </div>
                    </article>
                ) : (
                    <div className={styles.message}>
                        <p>Esse personagem não está mais nos seus favoritos.</p>
                        <Link href="/personagens">Encontrar personagens</Link>
                    </div>
                )}
            </main>
        </>
    );
}