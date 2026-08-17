# 🧙‍♂️ WizardDex - Enciclopédia Digital dos Personagens Harry Potter

> Uma aplicação web interativa desenvolvida em **Next.js 16** que funciona como uma enciclopédia digital dos personagens do universo Harry Potter.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=flat-square&logo=nextjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev)
[![Axios](https://img.shields.io/badge/Axios-1.19.0-671ddf?style=flat-square&logo=axios)](https://axios-http.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 🌟 Características

- 🔍 **Busca em Tempo Real** - Filtre personagens instantaneamente
- ❤️ **Sistema de Favoritos** - Salve seus personagens favoritos (persistência local)
- 📱 **Design Responsivo** - Funciona perfeitamente em mobile, tablet e desktop
- 🎨 **Interface Intuitiva** - Design inspirado no universo Harry Potter
- ⚡ **Performance Otimizada** - Imagens otimizadas com Next/Image
- 🔐 **Tratamento de Erros** - Handling robusto de erros de API

## 📸 Páginas

### 🏠 Home (/)
Apresentação do projeto com banner, tecnologias utilizadas e navegação rápida.

### 🧙 Personagens (/personagens)
Grid responsivo de personagens com:
- Busca em tempo real
- Cards com informações básicas
- Modal com detalhes completos
- Sistema de favoritos
- Notificações de ação

### ℹ️ Sobre (/sobre)
Informações sobre o projeto, turma, professores e integrantes do grupo.

### 🚫 404
Página personalizada para rotas não encontradas.

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/bruxos-front.git

# Entre no diretório
cd bruxos-front

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build Produção

```bash
npm run build
npm start
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 16** - Framework React com SSR
- **React 19** - Biblioteca de UI
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações
- **CSS Modules** - Estilização modular
- **localStorage API** - Persistência de dados

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── page.jsx                 # Home
│   ├── layout.js                # Layout raiz
│   ├── globals.css              # Estilos globais
│   ├── not-found.jsx            # Página 404
│   ├── sobre/                   # Rota /sobre
│   └── personagens/             # Rota /personagens
└── components/
    ├── Header/                  # Navbar
    ├── CharacterCard/           # Card do personagem
    └── CharacterModal/          # Modal de detalhes
```

## 🎯 Funcionalidades

### API Integration
- Integração com [HP API](https://hp-api.onrender.com/api/characters)
- Requisições com Axios
- Tratamento de erros com try/catch/finally

### Gerenciamento de Estado
- Hooks: `useState`, `useEffect`
- localStorage para persistência
- Notificações com React Hot Toast

### User Interface
- Loading states animados
- Error boundaries
- Buscas responsivas
- Modal interativo

## 📱 Responsividade

Testado em:
- 📱 Mobile: 320px - 480px
- 📱 Tablet: 481px - 768px
- 💻 Desktop: 769px+

## 🎨 Design

Paleta de cores inspirada no universo Harry Potter:
- Azuis do castelo de Hogwarts
- Dourados e marrons
- Efeitos visuais suaves

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm start        # Inicia servidor de produção
npm run lint     # Valida o código
npm run format   # Formata o código
```

## 🔗 Links Úteis

- [HP API Documentation](https://hp-api.onrender.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Axios Docs](https://axios-http.com)

## 🎓 Aprendizados

Este projeto demonstra:
- ✅ Next.js App Router
- ✅ React Hooks (useState, useEffect)
- ✅ Requisições HTTP assíncronas
- ✅ Tratamento de erros robusto
- ✅ Componentização profissional
- ✅ Design responsivo
- ✅ localStorage API
- ✅ Navegação com Next/Link

## 📄 Documentação

Para mais informações, consulte:
- [DOCUMENTACAO.md](./DOCUMENTACAO.md) - Documentação completa
- [GUIA_ENTREGA.md](./GUIA_ENTREGA.md) - Guia de entrega
- [CONCLUSAO.md](./CONCLUSAO.md) - Sumário de conclusão

## 👥 Autores

Desenvolvido pela equipe **2TDS1** como atividade prática de Front-End.

## 📄 Licença

Este projeto é acadêmico e livre para uso educacional.

---

**Que a magia do código esteja com você! 🧙‍♂️✨**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
