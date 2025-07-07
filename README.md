# Movie Tracker MVP

Uma aplicação React para rastreamento de filmes que permite aos usuários gerenciar listas de filmes para assistir, acompanhar filmes assistidos e avaliar/comentar filmes.

## 🎬 Funcionalidades

- **Autenticação de Usuário**: Sistema de login simples com persistência no localStorage
- **Busca de Filmes**: Busque filmes usando a API do The Movie Database (TMDB)
- **Gerenciamento de Lista de Filmes**: Adicione filmes à lista para assistir e marque como assistidos
- **Avaliações e Comentários**: Avalie filmes (1-5 estrelas) e deixe comentários
- **Análises do Dashboard**: Visualize estatísticas sobre filmes assistidos, gêneros favoritos e mais
- **Design Responsivo**: Interface moderna inspirada no cinema com tema escuro

## 🚀 Início Rápido para Professores

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Instruções de Configuração

1. **Clonar e Instalar**
   ```bash
   cd MVP-2
   npm install
   ```

2. **Executar a Aplicação**
   ```bash
   npm start
   ```
   - Abre em http://localhost:3000
   - Faça login com qualquer usuário/senha (para fins de demonstração)

**Nota**: A aplicação inclui uma chave de API de fallback para avaliação acadêmica, então funciona imediatamente sem configuração adicional.

## 🔐 Implementação de Segurança

**Configuração para Avaliação Acadêmica**: 
- App funciona imediatamente após `npm install && npm start`
- Inclui chave de API demo para avaliação do professor
- Em produção, chaves de API estariam apenas no servidor

**Para Uso em Produção**:
- Crie arquivo `.env` com sua própria chave de API do TMDB
- Remova a chave de fallback do código fonte
- Implemente proxy de API backend adequado

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes UI reutilizáveis
│   ├── MovieCard.js    # Cards de exibição de filmes
│   ├── StarRating.js   # Avaliação interativa por estrelas
│   ├── MovieStats.js   # Análises do dashboard
│   └── ...
├── pages/              # Páginas principais da aplicação
│   ├── Dashboard.js    # Dashboard principal com estatísticas
│   ├── Watchlist.js    # Gerenciamento da lista de filmes
│   ├── Watched.js      # Lista de filmes assistidos
│   ├── MovieDetail.js  # Detalhes do filme com avaliação
│   └── ...
├── utils/              # Funções utilitárias
└── App.js             # Componente principal da aplicação
```

## 🎯 Principais Implementações Técnicas

### Gerenciamento de Estado
- React hooks (useState, useEffect, useMemo)
- localStorage para persistência de dados
- Gerenciamento de estado a nível de componente

### Roteamento
- React Router v6 com navegação adequada
- Rotas protegidas com autenticação
- Passagem de estado entre rotas

### Integração com API
- API TMDB para dados e busca de filmes
- Tratamento de erros e estados de carregamento
- Configuração de variáveis de ambiente

## 🔌 Detalhes da API Externa

### API do The Movie Database (TMDB)
- **Nome da API**: The Movie Database (TMDB) API v3
- **Licença**: Creative Commons Attribution-ShareAlike 4.0 International License
- **Requisitos de Acesso**: 
  - Registro gratuito de chave de API em https://www.themoviedb.org/settings/api
  - Sem limites de taxa para uso pessoal/educacional
  - Atribuição necessária ao exibir dados de filmes
- **Rotas da API Utilizadas**:
  - `GET /3/search/movie` - Buscar filmes por título
  - `GET /3/movie/{movie_id}` - Obter informações detalhadas do filme incluindo gêneros, sinopse e metadados
- **URL Base**: `https://api.themoviedb.org/3/`
- **Autenticação**: Chave de API passada como parâmetro de consulta (`api_key`)
- **Formato de Dados**: Respostas JSON com objetos de filme contendo título, poster_path, release_date, overview, genres, etc.

### Design UI/UX
- CSS moderno com propriedades customizadas
- Princípios de design responsivo
- Considerações de acessibilidade
- Spinners de carregamento e feedback do usuário

## 🧪 Testando a Aplicação

### Fluxo de Demonstração
1. **Login**: Use qualquer credencial (autenticação demo)
2. **Buscar Filmes**: Use a página "Adicionar Filme" para buscar no TMDB
3. **Adicionar à Lista**: Adicione filmes à sua lista para assistir
4. **Marcar como Assistido**: Marque filmes como assistidos do dashboard ou lista
5. **Avaliar e Comentar**: Avalie filmes diretamente na página de detalhes do filme
6. **Ver Análises**: Verifique o dashboard para estatísticas de visualização

### Dados de Teste de Exemplo
A aplicação funcionará com qualquer filme do TMDB. Buscas populares:
- "Inception"
- "The Dark Knight"
- "Interstellar"
- "Avengers"

## 📝 Notas da Tarefa

Este projeto demonstra:
- **Fundamentos do React**: Componentes, hooks, gerenciamento de estado
- **Integração com API**: Consumo de API externa com tratamento de erros
- **Consciência de Segurança**: Gerenciamento adequado de chaves de API
- **Experiência do Usuário**: Design de interface intuitivo
- **Organização de Código**: Estrutura de código limpa e manutenível
- **Desenvolvimento Moderno**: Padrões e melhores práticas atuais do React

## 🔧 Scripts Disponíveis

- `npm start` - Executar servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm test` - Executar testes (se implementados)

## 📞 Suporte

Se você encontrar problemas durante a avaliação:
1. Certifique-se de que o Node.js está instalado (v14+)
2. Verifique se a chave de API do TMDB está corretamente definida no `.env`
3. Verifique o console para mensagens de erro
4. Tente `npm install` se as dependências parecerem estar faltando
