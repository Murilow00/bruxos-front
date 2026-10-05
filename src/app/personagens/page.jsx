'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Header from '@/components/Header/Header';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import CharacterModal from '@/components/CharacterModal/CharacterModal';
import Link from 'next/link';
import styles from './page.module.css';

const createEmptyCharacter = () => ({
    name: '',
    house: '',
    species: '',
    patronus: '',
    actor: '',
    eyeColour: '',
    hairColour: '',
    dateOfBirth: '',
    image: '',
    alive: true,
});

export default function Personagens() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newCharacter, setNewCharacter] = useState(createEmptyCharacter);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const loadCharacters = async() => {
            try{
                setLoading(true);
                setError(null);

                const savedCharacters = localStorage.getItem('characters');
                const cachedCharacters = savedCharacters ? JSON.parse(savedCharacters) : [];
                let allCharacters = cachedCharacters;

                try {
                    const response = await axios.get('/api/personagem');
                    const customCharacters = cachedCharacters.filter((character) =>
                        character.id?.startsWith('custom-')
                    );
                    allCharacters = [...response.data, ...customCharacters];
                    localStorage.setItem('characters', JSON.stringify(allCharacters));
                } catch (apiError) {
                    if (cachedCharacters.length === 0) throw apiError;
                    console.error('Usando personagens salvos: a API está indisponível.', apiError);
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

    const handleCreateCharacter = (event) => {
        event.preventDefault();
        const character = {
            ...newCharacter,
            name: newCharacter.name.trim(),
            id: `custom-${Date.now()}`,
        };

        if (!character.name) {
            toast.error('Informe o nome do personagem.');
            return;
        }

        const updatedCharacters = [...characters, character];
        setCharacters(updatedCharacters);
        localStorage.setItem('characters', JSON.stringify(updatedCharacters));
        setNewCharacter(createEmptyCharacter());
        setIsCreateModalOpen(false);
        toast.success('Personagem adicionado!');
    };

    const handleNewCharacterChange = (event) => {
        const { name, value } = event.target;
        setNewCharacter((currentCharacter) => ({
            ...currentCharacter,
            [name]: name === 'alive' ? value === 'true' : value,
        }));
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

    const visibleCharacters = activeTab === 'favorites'
        ? characters.filter((character) => isFavorited(character))
        : characters;

    return (
        <>
            <Header title="Personagens" subtitle="Conheça os personagens do universo Harry Potter" />
            <main className={styles.container}>
                <div className={styles.listToolbar}>
                    <div className={styles.tabs}>
                        <button
                            type="button"
                            className={`${styles.tabButton} ${activeTab === 'all' ? styles.tabButtonActive : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            Todos
                            <span className={styles.tabCount}>{characters.length}</span>
                        </button>
                        <button
                            type="button"
                            className={`${styles.tabButton} ${activeTab === 'favorites' ? styles.tabButtonActive : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            Favoritos
                            <span className={styles.tabCount}>{favorites.length}</span>
                        </button>
                    </div>
                    <button
                        type="button"
                        className={styles.addCharacterButton}
                        disabled={loading}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <span aria-hidden="true">＋</span> Adicionar personagem
                    </button>
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
                        {visibleCharacters.length > 0 ? (
                            <div className={styles.gridCharacters}>
                                {visibleCharacters.map((character, index) => (
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
                                <p>
                                    {activeTab === 'favorites'
                                        ? 'Nenhum personagem favoritado ainda.'
                                        : 'Nenhum personagem encontrado'}
                                </p>
                            </div>
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

                {isCreateModalOpen && (
                    <div className={styles.createOverlay}>
                        <section
                            className={styles.createModal}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="createCharacterTitle"
                        >
                            <div className={styles.createModalHeader}>
                                <h2 id="createCharacterTitle">Adicionar personagem</h2>
                                <button
                                    type="button"
                                    className={styles.closeCreateModal}
                                    aria-label="Fechar formulário"
                                    onClick={() => setIsCreateModalOpen(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <form className={styles.createForm} onSubmit={handleCreateCharacter}>
                                {[
                                    { name: 'name', label: 'Nome', required: true },
                                    { name: 'house', label: 'Casa' },
                                    { name: 'species', label: 'Espécie' },
                                    { name: 'patronus', label: 'Patrono' },
                                    { name: 'actor', label: 'Ator/Atriz' },
                                    { name: 'eyeColour', label: 'Cor dos olhos' },
                                    { name: 'hairColour', label: 'Cor do cabelo' },
                                    { name: 'dateOfBirth', label: 'Data de nascimento' },
                                    { name: 'image', label: 'URL da imagem', type: 'url' },
                                ].map(({ name, label, required = false, type = 'text' }) => (
                                    <label className={styles.formField} key={name}>
                                        <span>{label}{required ? ' *' : ''}</span>
                                        <input
                                            name={name}
                                            type={type}
                                            value={newCharacter[name]}
                                            onChange={handleNewCharacterChange}
                                            required={required}
                                        />
                                    </label>
                                ))}
                                <label className={styles.formField}>
                                    <span>Situação</span>
                                    <select
                                        name="alive"
                                        value={String(newCharacter.alive)}
                                        onChange={handleNewCharacterChange}
                                    >
                                        <option value="true">Vivo</option>
                                        <option value="false">Morto</option>
                                    </select>
                                </label>
                                <div className={styles.formActions}>
                                    <button
                                        type="button"
                                        className={styles.cancelCreateButton}
                                        onClick={() => setIsCreateModalOpen(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className={styles.saveCharacterButton}>
                                        Salvar personagem
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                )}

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
