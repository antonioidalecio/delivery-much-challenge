# Recipe API

## Descrição

Este repositório contém a implementação de uma API de busca de Receitas (Recipes) por ingredientes, que foi desenvolvida em Typescript e NodeJS. Essa API utiliza algumas APIs externas, são elas:

- API para consulta de receitas: http://www.recipepuppy.com/about/api

- API para consulta dos GIFs das receitas: https://developers.giphy.com/docs

Este projeto foi desenvolvido utilizando:

- Kubuntu 20.04
- Typescript 4.1.2
- Node 14.15
- Yarn 1.22.10
- NPM 6.14.8
- Docker 19.03.14

## Antes de executar

Antes de executar a aplicação, é necessário configurar uma chave de acesso (API Key) para utilização da API do GIPHY. Para isto, basta seguir os passos abaixo:

1) Vá até o [site de desenvolvedores do GIPHY](https://developers.giphy.com/docs/sdk), crie uma conta (caso não tenha), e em seguida faça o login.
2) Em seguida, localize a opção para criar um app através da opção "Create an App".
3) Ao criar um app, serão mostradas duas opções, "SDK" e "API", selecione "SDK" e avançe para o próximo passo.
4) Será necessário informar um nome para a sua aplicação e uma descrição, nessa etapa você pode informar qualquer nome e descrição que desejar e clicar no botão "Create App".
5) Após criado o app, será gerada uma API Key a qual é necessária para utilizar a API do GIPHY.

Com a API Key do GIPHY gerada, é necessário copiá-la para um arquivo `.env`. Para facilitar este processo, na raiz do projeto existe um arquivo chamado `.env.example`. Basta fazer uma cópia deste arquivo e renomear para apenas `.env`. Em seguida, basta copiar e colar o valor da sua API Key na variável de ambiente `GIPHY_API_KEY`. Uma vez feito isso, seu `.env` deverá estar parecido com este:

```properties
APP_PORT=3000
RECIPE_PUPPY_API_URL=http://www.recipepuppy.com/api
GIPHY_API_KEY=abcdeFGHIJKlmnoPQRSt
```

## Como executar

É possível executar esta aplicação de duas formas: utilizando o Docker, ou diretamente com as dependências instaladas em seu computador caso não tenha o Docker ou não queira utilizá-lo.

Abaixo estão listados os passos para executar a aplicação das duas formas:

### Executando com o Docker

Para executar a aplicação utilizando o Docker basta tê-lo instalado em sua máquina e seguir os passos abaixo:

1) Navegue até a pasta raiz do projeto onde o arquivo `Dockerfile` está localizado, e execute o comando abaixo para gerar uma imagem da aplicação:

```bash
docker build -t recipe-api .
```

2) Em seguida, basta criar um container a partir da imagem criada anteriormente. Para isto, basta executar o comando abaixo, especificando a flag `-p 3000:3000`, onde a primeira opção é a porta da sua máquina a qual você utilizará para fazer as requisições HTTP para a API, e a segunda é a porta que a aplicação está rodando dentro do container, que por padrão é a porta `3000`.

```bash
docker run -it -p 3000:3000 --env-file .env recipe-api
```

3) Após executar o comando, você deverá ver uma mensagem de que a aplicação está "escutando" na porta 3000.

```
Listening on port 3000
```

### Executando sem o Docker

Para executar a aplicação sem utilizar o Docker é necessário possuir configurados em sua máquina o `node` e `npm` ou `yarn`. Uma vez que você já tenha essas dependências, basta seguir os passos abaixo:

1) Navegue até a pasta raiz do projeto onde o arquivo `package.json` está localizado e execute o seguinte comando:

```bash
yarn

ou

npm install
```

2) Uma vez instaladas as dependências você pode executar o comando abaixo para rodar a aplicação em modo de desenvolvimento:

```bash
yarn dev

ou 

npm run dev
```

3) Semelhante ao caso anterior, utilizando Docker, você deverá ver uma mensagem informando que a aplicação está rodando na porta `3000`:


```
Listening on port 3000
```

## Testando a aplicação

No momento a aplicação disponibiliza apenas uma rota `GET` para buscar receitas através dos ingredientes.

```bash
GET /recipes?i={ingredient_1},{ingredient_2},{ingredient_3}
```

Onde:
- O parâmetro `i` representa os ingredientes que serão utilizados para buscar as receitas. Este parâmetro é opcional e é permitido no máximo 3 ingredientes.

Para testar, basta fazer uma requisição `GET` para `http://localhost:3000/recipes` passando de zero à três ingredientes como parâmetro, e observar se os resultados condizem com o que foi buscado. A estrutura da resposta deve ser um JSON, semelhante ao apresentado abaixo:

```json
{
    "keywords": [
        "rice",
        "garlic"
    ],
    "recipes": [
        {
            "ingredients": [
                "garlic",
                "rice",
                "water"
            ],
            "link": "http://allrecipes.com/Recipe/Linnies-Spanish-Rice/Detail.aspx",
            "title": "Linnie's Spanish Rice",
            "gif": "https://giphy.com/gifs/spanish-ay-no-por-favor-gFmlwMWSMhCXMccjU7"
        },
        {
            "ingredients": [
                "crab meat",
                "garlic",
                "onions",
                "rice"
            ],
            "link": "http://cookeatshare.com/recipes/king-crab-legs-over-rice-44677",
            "title": "\n                  King Crab Legs Over Rice Recipe\n                  \n",
            "gif": "https://giphy.com/gifs/latino-latinomen-crazy-legs-l0MYHV56DrSSNsaL6"
        }
    ]
}
```