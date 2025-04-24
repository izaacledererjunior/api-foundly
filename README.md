<div align="center">
  <a name="readme-top"></a>

  <h1>Foundly API</h1>
  <h3>Projeto Bootcamp Atlântico Avanti<h3>

🚧 **ATENÇÃO: ESTE PROJETO ESTÁ EM DESENVOLVIMENTO!** 🚧

  <p>
     API para gerenciar itens perdidos e encontrados, usuários e categorias.
  </p>

</div>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-4.x-brightgreen?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.x-blue?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)
![Swagger](https://img.shields.io/badge/Swagger-3.x-brightgreen?logo=swagger)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=jwt)
![Multer](https://img.shields.io/badge/Multer-File_Upload-red)

</p>

## 🚀 Como Rodar o Projeto Localmente

A Foundly API pode ser executada com **Node.js**. 

#### Passos:

1. Clone o repositório da **Foundly API**:

   ```bash
   git clone https://github.com/izaacledererjunior/api-foundly
   cd foundly-api
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Acesse o projeto no seu navegador:

   ```bash
   http://localhost:8000
   ```

4. Configure as variáveis de ambiente no arquivo `.env`:

   ```ini
    DATABASE_URL=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    AWS_BUCKET_NAME=
    PORT=8000
    JWT_SECRET=
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run start:dev
   ```

6. Acesse o projeto no seu navegador:

   ```bash
   http://localhost:8000
   ```

---

## 🌐 Hospedagem

Este projeto está hospedado na **AWS EC2** e pode ser acessado através do seguinte link:

- [Foundly API - AWS](http://3.145.188.237:8000)

---

### 🌐 Infraestrutura

O banco de dados utilizado pela Foundly API está hospedado em um **Amazon RDS** para garantir alta disponibilidade e escalabilidade. As imagens enviadas para a aplicação são armazenadas em um **bucket S3 da AWS**, proporcionando segurança e fácil acesso aos arquivos.

- **Banco de Dados**: Amazon RDS (PostgreSQL)
- **Armazenamento de Imagens**: AWS S3

---

## 📄 Documentação da API

A API é documentada com Swagger, e você pode acessá-la em:

- Localmente: [http://localhost:8000/api-docs](http://localhost:3000/api-docs)
- Produção: [Documentação Foundly](http://3.145.188.237:8000/api-docs/)

---

## 📄 Rotas da API

### **Rotas de Autenticação**

#### Registro de Usuário
**POST** `/api/auth/register`
- Permite o registro de um novo usuário.
- **Campos obrigatórios**: `email`, `password`, `telefone`.

#### Login de Usuário
**POST** `/api/auth/login`
- Permite que um usuário faça login e receba um token JWT.
- **Campos obrigatórios**: `email`, `password`.

---

### **Rotas de Usuários**

#### Listar Usuários
**GET** `/api/users`
- Retorna a lista de todos os usuários ativos.

#### Obter Usuário por ID
**GET** `/api/users/{id}`
- Retorna os detalhes de um usuário pelo ID.

#### Atualizar Usuário
**PUT** `/api/users/{id}`
- Atualiza os dados de um usuário existente.
- **Campos opcionais**: `name`, `telefone`.

#### Deletar Usuário (Soft Delete)
**DELETE** `/api/users/{id}`
- Realiza o soft delete de um usuário pelo ID.

#### Obter Usuário por Email
**GET** `/api/users/email`
- Retorna os detalhes de um usuário pelo email.
- **Parâmetro obrigatório**: `email`.

---

### **Rotas de Itens**

#### Listar Itens
**GET** `/api/items`
- Retorna a lista de todos os itens ativos.

#### Criar Item
**POST** `/api/items`
- Permite criar um novo item perdido ou encontrado.
- **Campos obrigatórios**: `name`, `descricao`, `categoriaId`, `date`, `location`, `contact`, `status`, `userId`, `codigoUnico`.

#### Obter Item por ID
**GET** `/api/items/{id}`
- Retorna os detalhes de um item pelo ID.

#### Atualizar Item
**PUT** `/api/items/{id}`
- Atualiza os dados de um item existente.
- **Campos opcionais**: `name`, `descricao`, `categoriaId`, `date`, `location`, `contact`, `status`.

#### Deletar Item (Soft Delete)
**DELETE** `/api/items/{id}`
- Realiza o soft delete de um item pelo ID.

#### Upload de Imagens para um Item
**POST** `/api/items/{id}/upload`
- Permite subir uma imagem para um item.
- **Campo obrigatório**: `foto` (formato `multipart/form-data`).

#### Listar Itens Deletados
**GET** `/api/items/deleted`
- Retorna a lista de todos os itens deletados.

#### Listar Itens Ativos
**GET** `/api/items/active`
- Retorna a lista de todos os itens ativos.

---

### **Rotas de Categorias**

#### Listar Categorias
**GET** `/api/categories`
- Retorna a lista de todas as categorias.

#### Criar Categoria
**POST** `/api/categories`
- Permite criar uma nova categoria.
- **Campo obrigatório**: `nome`.

#### Obter Categoria por ID
**GET** `/api/categories/{id}`
- Retorna os detalhes de uma categoria pelo ID.

#### Atualizar Categoria
**PUT** `/api/categories/{id}`
- Atualiza os dados de uma categoria existente.
- **Campo obrigatório**: `nome`.

#### Deletar Categoria
**DELETE** `/api/categories/{id}`
- Deleta uma categoria pelo ID.

---

## 📜 Licença

- Este projeto está licenciado sob a MIT License. Confira em `LICENSE.txt`.

## Desenvolvedors

- **Email**: izaacledererjunior@gmail.com
- **Email**: amandaellem2023@gmail.com
- **Email**: ingridalmeida3197@gmail.com
- **Email**: eduardolcb18@gmail.com
- **Email**: jonasmonteirotst@gmail.com

---

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>