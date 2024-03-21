<p align="center">
  <a href="" target="blank"><img src="movie.png" width="200" alt="Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Um projeto de exemplo desenvolvido com um framework <a href="http://nodejs.org" target="_blank">Node.js</a>, chamado <a href="https://nestjs.com/" target="_blank">Nest.js</a></p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Projeto desenvolvido com alunos, para mostrar funcionalidades do Nest.js
Projeto consiste em uma simulação de sistema de locação e streaming de filmes e series.

[Nest](https://github.com/nestjs/nest) 

# Descrição da API
## Modulo de Usuario
Caminho para o módulo: ``` /usuarios```
Métodos do módulo:
```bash
Tipo: GET
caminho: /usuarios/
Parametros esperados:
  Body: --
  Params: --
Retorno:

list{id,
nome,
cidade,
email}
```

```bash
Tipo: Put
caminho: /usuarios/:id
Parametros esperados:
  Body: {
    nome: string,
    idade: int,
    cidade: string,
    email: string,
    telefone: string,
    senha: string
  }
  Params: ID_USUARIO
Retorno:
{
  usuario: usuarioAtualizado,
  message
}
```

```bash
Tipo: DELETE
caminho: /usuarios/:id
Parametros esperados:
  Body: --
  Params: ID_USUARIO
Retorno:
{
  usuario: usuarioRemovido,
  message
}
```


```bash
Tipo: Post
caminho: /usuarios/:id
Parametros esperados:
  Body: {
    nome: string,
    idade: int,
    cidade: string,
    email: string,
    telefone: string,
    senha: string
  }
  Params: --
Retorno:
{
  id: usuario.id,
  message
}
```


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [João Pedro Parella]


## License

Nest is [MIT licensed](LICENSE).
