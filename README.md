# Estudos com o framework [NestJS](http://nestjs.com/)
> Módulo Básico

## Índice

- [Requisitos](#requisitos)
- [Plataforma](#plataforma)
- [Curso](#curso)
  - [Instrutor](#instrutor)
- [Comandas Úteis](#comandos-úteis)
  - [Docker](#docker)
  - [NestJS](#nestjs)
  - [TypeORM](#typeorm)

## Requisitos

- NodeJS
- NPM

## Plataforma

[Udemy](https://www.udemy.com/)

## Curso

[NestJS do Zero com TypeORM, Mongoose, Prisma e Swagger](https://www.udemy.com/course/nestjs-do-zero/)

### Instrutor

[Jorge Aluizio Alves de Souza](https://www.udemy.com/user/jorge-aluizio-alves-de-souza/)

## Comandos Úteis

### Docker

- 1 Criar e "rodar" o container do Banco de Dados
```bash
docker-compose -f docker/docker-compose.yaml up -d
```

### NestJS

- 1 Instalação do NestJS
```bash
npm i -g @nestjs/cli
```

- 2 Criando um projeto com NestJS
```bash
nest new {name-project}
```

- 3 Para criar um _module_
```bash
nest generate module {name-module}
```
ou
```bash
nest g module {name-module}
```

- 4 Para criar um _controller_
```bash
nest generate controller {name-controller}
```
ou
```bash
nest g controller {name-controller}
```

  - 4.1 Para criar um _controller_ sem o arquivo de testes
  ```bash
  nest g controller {name-controller} --no-spec
  ```

  - 4.2 Para ciar um _controller_ em uma estrutura de pastas diferente do que o NestJS oferece
  ```bash
  nest g controller {directory}/{name-controller}
  ```

  - 4.3 Para validar, antes de criar um _controller_, em uma estrutura de pastas diferente do que o NestJS oferece. Ou seja, "experimentar"
  ```bash
  nest g controller {directory}/{name-controller} --dry-run
  ```

- 5 Para criar um _service_
```bash
nest generate service {name-service}
```
ou
```bash
nest g service {name-service}
```

6 - Para criar uma Classe
> Você pode criar a Classe e os diretórios em um único comando

```bash
nest generate class {path-to-file}

# nest generate class courses/dto/create-course.dto
```
ou
```bash
nest g class {path-t-file}

# nest g class courses/dto/create-course.dto
```

  - 6.1 Para criar uma classe sem o arquivo de teste
  ```bash
  nest generate class {path-to-file} --no-spec

  # nest g class courses/dto/create-course.dto --no-spec
  ```

### TypeORM

1 - Para gerar uma _migration_:
```bash
# Para não precisar instalar a CLI utilizamos "npx"
npx typeorm migration:create -n {name-migration}
```

2 - Para executar uma _migration_:
```bash
# Para não precisar instalar a CLI utilizamos "npx"
npx typeorm migration:run
```

3 - Para reverter uma _migration_:
```bash
# Para não precisar instalar a CLI utilizamos "npx"
npx typeorm migration:revert
```