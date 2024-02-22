# Desafio Técnico - Restaurante do Dia

Esta é uma experiência prática com o objetivo de proporcionar uma vivência intensiva de desenvolvimento de um pequeno projeto em equipe. Trata-se de um processo de mapeamento e diagnóstico para compreender as suas potencialidades técnicas, além de apoiar na mitigação de lacunas em relação ao seu desenvolvimento.

## Objetivo do Projeto

Os times da DB enfrentam um grande problema. Como eles são muito democráticos, todos os dias eles gastam 2 horas decidindo onde eles irão almoçar. Você deve fazer um pequeno sistema que auxilie essa tomada de decisão! A sua missão é desenvolver backend e frontend desta aplicação em uma estrutura de APIs REST com interface responsiva.

## Pré-Requisitos

Antes de começar, certifique-se de ter instalado:

- Git
- Node.js 18+ e npm (ou similares)
- Java 17
- Maven

## Cópia do Template e Clonagem Local

Para fazer a cópia deste template para um repositório sob seu domínio, siga o [passo a passo](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

Após obtido o template, para fazer a clonagem local que possibilitará iniciar o desenvolvimento, utilize o seguinte comando:

```bash
git clone https://github.com/[SEU_USERNAME]/[NOME_DE_REPOSITORIO_USADO_NA_COPIA].git
```

> Após clonar o repositório, você pode prosseguir com a instalação e configuração dos componentes do projeto.

## Instalação e Configuração

### Backend

1. Navegue até a pasta `backend`:

```bash
cd backend
```

2. Use o Maven para instalar as dependências e construir o projeto:

```bash
mvn clean install
```

3. Para iniciar a aplicação Spring Boot, execute:

```bash
mvn spring-boot:run
```

#### Autenticação (JWT)

**Criar usuário**

[POST] http://localhost:8080/auth/register
```json
{
    "email": "SEU_EMAIL@exemplo.com.br",
    "password": "SUA_SENHA"
}
```

**Autenticar usuário**

[POST] http://localhost:8080/auth/login
```json
{
    "email": "SEU_EMAIL@exemplo.com.br",
    "password": "SUA_SENHA"
}
```

#### H2 Console

- **URL:** http://localhost:8080/h2-console
- **Driver Class:** org.h2.Driver
- **JDBC URL:** jdbc:h2:mem:testdb
- **User Name:** sa
- **Password:** 

### Frontend

1. Navegue até a pasta `frontend`:

```bash
cd frontend
```

2. Instale as dependências utilizando npm (ou similares, ex.: yarn):

```bash
npm install
```

**ou**

```bash
yarn install
```

3. Duplique o arquivo `.env.local.example` e renomeie a cópia para `.env.local`. Ajuste as variáveis de ambiente conforme necessário.

4. Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

**ou**

```bash
yarn dev
```

## Testes

- **Backend**: Para executar os testes do backend, utilize o comando:

```bash
mvn test
```

- **Frontend**: Para executar os testes do frontend, use:

```bash
npm run test
```

**ou**

```bash
yarn test
```
