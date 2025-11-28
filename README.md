# Frontend PWA/SPA – Vue 3 + Vuetify  
### Complemento e consumidor da API **Laravel API com ACL**

Este é o **frontend oficial** que consome e complementa todos os recursos fornecidos pela **Laravel API com ACL**, disponível em:

➡️ **Backend:** https://github.com/paulokalleby/laravel-api-with-acl

O projeto foi desenvolvido como um **PWA/SPA moderno**, utilizando Vue 3, Vuetify 3, Vite, Pinia e integração com a API via autenticação JWT.

---

## 🔗 Integração com o Backend

Este frontend depende diretamente dos recursos fornecidos pela API Laravel:

- Autenticação com **JWT (Sanctum)**
- ACL baseada em **Roles & Permissions**
- CRUD de usuários e papéis
- Recuperação de senha via validação por e-mail
- Proteção de rotas baseadas em permissões
- Consumo dos endpoints documentados via **OpenAPI/Scramble**

Toda a comunicação é feita via **Axios**, com interceptors para renovação e validação de token.

---

## 🚀 Tecnologias Utilizadas

- **Vue 3** + `<script setup>`
- **Vite**
- **Vuetify 3**
- **Pinia** (store)
- **Vue Router**
- **Axios**
- **PWA-ready** (manifest + service worker)
- **ESLint + Prettier** opcionais

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/paulokalleby/frontend-vue-acl.git
cd frontend-vue-acl
```

### 2. Instale as dependências
```bash
npm install
```

## 🔧 Configuração de Ambiente

Crie o arquivo .env:
```bash
cp .env.example .env
```

Configure a URL da API:
```bash
VITE_API_URL=http://localhost:8000/api
```

Essa URL deve apontar para o backend descrito acima.

## 🏃 Rodando em Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em:

👉 http://localhost:3000

## 🚀 Build para Produção
```bash
npm run build
```


Os arquivos finais ficarão na pasta:
```bash
/dist
```


Para pré-visualização do build:
```bash
npm run preview
```

## 🔐 Autenticação & ACL

Este frontend implementa:

- Persistência de token
- Interceptors Axios
- Carregamento dinâmico das permissões
- Bloqueio de rotas não autorizadas
- Exibição condicional de menus e botões por permissão
- Estado compartilhado via Pinia

## 📚 Documentação da API

Toda a integração deste frontend segue a documentação exposta no backend:

👉 http://localhost:8000/docs/api

🧪 Testes (opcional)

## 📄 Licença

Licença MIT — livre para uso pessoal e comercial.
