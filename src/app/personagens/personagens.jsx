'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Header from '@/components/Header/Header';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import CharacterModal from '@/components/CharacterModal/CharacterModal';
import Link from 'next/link';
import styles from './page.module.css';

export default function Personagens() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Carregar favoritos do localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteCharacters');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (err) {
                console.error('Erro ao carregar favoritos:', err);
            }
        }
    }, []);

    // Buscar personagens da API
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get('https://hp-api.onrender.com/api/characters');
                setCharacters(response.data);
            } catch (err) {
                console.error('Erro ao buscar personagens:', err);
                setError('Erro ao carregar os personagens. Tente novamente mais tarde.');
                toast.error('Erro ao carregar personagens!');
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    // Salvar favoritos no localStorage
    useEffect(() => {
        localStorage.setItem('favoriteCharacters', JSON.stringify(favorites));
    }, [favorites]);

    const handleCardClick = (character) => {
        setSelectedCharacter(character);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCharacter(null);
    };

    const handleFavoriteClick = (character) => {
        const isFavorited = favorites.some((fav) => fav.name === character.name);

        if (isFavorited) {
            setFavorites(favorites.filter((fav) => fav.name !== character.name));
            toast.success(`${character.name} removido dos favoritos!`);
        } else {
            setFavorites([...favorites, character]);
            toast.success(`${character.name} adicionado aos favoritos!`);
        }
    };

    const isFavorited = (character) => {
        if (!character) return false;
        return favorites.some((fav) => fav.name === character.name);
    };

    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header title="Personagens" subtitle="Conheça os personagens do universo Harry Potter" />
            <main className={styles.container}>
                {/* Barra de busca */}
                <div className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar personagem..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {/* Estado de carregamento */}
                {loading && (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                        <p className={styles.loadingText}>Carregando personagens...</p>
                    </div>
                )}

                {/* Estado de erro */}
                {error && (
                    <div className={styles.errorContainer}>
                        <p className={styles.errorText}>⚠️ {error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className={styles.retryBtn}
                        >
                            Tentar Novamente
                        </button>
                    </div>
                )}

                {/* Grid de personagens */}
                {!loading && !error && characters.length > 0 && (
                    <>
                        <div className={styles.resultsInfo}>
                            <p>
                                Mostrando <strong>{filteredCharacters.length}</strong> de{' '}
                                <strong>{characters.length}</strong> personagens
                            </p>
                        </div>

                        {filteredCharacters.length > 0 ? (
                            <div className={styles.gridCharacters}>
                                {filteredCharacters.map((character, index) => (
                                    <CharacterCard
                                        key={`${index}-${character.name}`}
                                        character={character}
                                        onCardClick={handleCardClick}
                                        onFavoriteClick={handleFavoriteClick}
                                        isFavorited={isFavorited(character)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResults}>
                                <p>Nenhum personagem encontrado com "{searchTerm}"</p>
                            </div>
                        )}
                    </>
                )}

                {/* Modal de detalhes */}
                <CharacterModal
                    isOpen={isModalOpen}
                    character={selectedCharacter}
                    onClose={handleCloseModal}
                    onFavoriteClick={handleFavoriteClick}
                    isFavorited={isFavorited(selectedCharacter)}
                />

                {/* Navegação */}
                <div className={styles.navegacao}>
                    <Link href="/sobre" className={styles.botao}>
                        ← Ir para Sobre
                    </Link>
                    <Link href="/" className={styles.botao}>
                        Voltar para Home →
                    </Link>
                </div>
            </main>
        </>
    );
}
