# Desafio Técnico - Linx

O desafio consistia em 2 partes: uma API que negue requisições repetidas dentro de 10 min e um agregador de URL's com validação.
Foi bem desafiador e um grande aprendizado, durante esse desafio aprendi conceitos como clusters, streams, cachê e mais.

Infelizmente com o meu conhecimento atual não foi possível fazer 100% do que foi pedido mas valeu demais a tentativa.

:rocket: :rocket: :rocket:

## Parte 1

### Instalação

1 - Clone o repositório

```bash
git clone https://github.com/procopio420/linx-desafio-tecnico.git
```

2 - Navegue para o diretório da parte 1

```bash
cd linx-desafio-tecnico/part1
```

3 - Instale as dependencias do projeto

```bash
npm install
```

ou caso prefira usar o yarn:

```bash
yarn
```

4 - Instale o Redis server

```bash
sudo apt update
sudo apt install redis
```

### Utilização

1 - Inicie o Redis server e mantenha-o rodando em um terminal

```bash
redis-server
```

2 - Navegue para o diretório da parte 1

```bash
cd linx-desafio-tecnico/part1
```

3 - Inicie o projeto

```bash
npm start
```

ou caso prefira usar o yarn:

```bash
yarn start
```

4 - Faça as requisições POST em localhost:8000

## Parte 2

### Instalação

1 - Clone o repositório

```bash
git clone https://github.com/procopio420/linx-desafio-tecnico.git
```

2 - Navegue para o diretório da parte 2

```bash
cd linx-desafio-tecnico/part2
```

3 - Instale as dependencias do projeto

```bash
npm install
```

ou caso prefira usar o yarn:

```bash
yarn
```

### Utilização
1 - Navegue para o diretório da parte 1

```bash
cd linx-desafio-tecnico/part1
```

2 - Inicie a API de teste

```bash
gem install sinatra
ruby url-aggregator-api.rb
```

3 - Inicie o projeto

```bash
npm start
```

ou caso prefira usar o yarn:

```bash
yarn start
```
