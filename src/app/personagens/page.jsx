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

    useEffect(() => {
        const loadCharacters = async() => {
            try{
                setLoading(true);
                setError(null);

                const savedCharacters = localStorage.getItem('characters');
                let allCharacters = [];

                if (savedCharacters) {
                    allCharacters = JSON.parse(savedCharacters);
                } else {
                    const response = await axios.get('https://hp-api.onrender.com/api/characters');
                    allCharacters = response.data;

                    localStorage.setItem('characters', JSON.stringify(allCharacters));
                }
                const savedFavorites = sessionStorage.getItem('favoriteCharacters');
                const favoriteList = savedFavorites ? JSON.parse(savedFavorites) : [];

                setFavorites(favoriteList);
                setCharacters(allCharacters);


            } catch (err) {
                console.error('Erro ao carregar personagens:', err);
                setError('Erro ao carregar os personagens. Tente novamente mais tarde.');
                toast.error('Erro ao carregar personagens!');
            } finally {
                setLoading(false);
            }
        };
        loadCharacters();
    }, []);


    

    const handleCardClick = (character) => {
        setSelectedCharacter(character);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCharacter(null);
    };

    const handleFavoriteClick = (character) => {
        const isAlreadyFavorited = favorites.some((fav) => fav.name === character.name);
        let updatedFavorites;

        if(isAlreadyFavorited) { 
        updatedFavorites = favorites.filter((fav) => fav.name !== character.name);
        toast.success(`${character.name} removido dos favoritos!`);
        } else {
            updatedFavorites = [...favorites, character];
            toast.success(`${character.name} adicionado aos favoritos!`);
        }    
        setFavorites(updatedFavorites);

        sessionStorage.setItem('favoriteCharacters', JSON.stringify(updatedFavorites));
    }
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
                <div className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar personagem..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {loading && (
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                        <p className={styles.loadingText}>Carregando personagens...</p>
                    </div>
                )}

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

                {!loading && !error && (
                    <>
                        {characters.length > 0 ? (
                            <div className={styles.gridCharacters}>
                                {characters.map((character, index) => (
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
                                <p>Nenhum personagem encontrado</p>
                            </div >
                        )}
                    </>
                )}

                <CharacterModal
                    isOpen={isModalOpen}
                    character={selectedCharacter}
                    onClose={handleCloseModal}
                    onFavoriteClick={handleFavoriteClick}
                    isFavorited={isFavorited(selectedCharacter)}
                />

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
