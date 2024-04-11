# Code Share API
NestJS
- MySQL + TypeORM
- SocketIO

## Editor Experience Recommendations (VScode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [sort-imports](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports)

## Node Version (lts/iron)
```bash
$ nvm install
# or
$ nvm use
```

## Installation
```bash
# If you don't have pnpm, run the comment below
$ npm i - g pnpm

$ pnpm install
```

## Docker
```bash
$ docker-compose up -d
```

## Running the app
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## format & lint
```bash
# prettier foramt
$ pnpm format

# eslint
$ pnpm lint
```
