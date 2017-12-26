# Sources

![](https://img.shields.io/travis/daily-bruin/sources.svg?style=flat)
[![Codecov](https://img.shields.io/codecov/c/github/daily-bruin/sources.svg)](https://codecov.io/github/daily-bruin/sources)
![](https://david-dm.org/daily-bruin/sources/status.svg?style=flat)
![](https://david-dm.org/daily-bruin/sources/dev-status.svg?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat)](https://github.com/facebook/jest)
[![license](https://img.shields.io/github/license/daily-bruin/sources.svg)]()

A small little website the Daily Bruin uses to keep track of all of our sources.
It's powered by an Express server with a MySQL backend and a GraphQL endpoint,
and uses React on the frontend.

Check out the [design specification](designs/spec.md) for more info!

## Technologies Used

## Contributing to Sources

### Prerequisites

There are a couple of programs and files Sources depends on that you'll need to
have installed to run it locally.

1. [Yarn](https://yarnpkg.com/lang/en/docs/install/) – Yarn is a JavaScript
   package manager, and an alternative to npm. We prefer it to npm because it
   has a couple of nice features such as caching, lockfiles, and faster
   downloads.
2. [Visual Studio Code](https://code.visualstudio.com) – VS Code is an open
   source text editor built by Microsoft and has amazing tooling support for
   TypeScript projects (as well as a lot of other awesome features!). You can
   use any text editor you want, but VS Code will give you a nice experience :).
3. PostgreSQL – Postgres is the database we use.
4. A `.env` file –

#### Installing PostgreSQL

##### Mac

You want to install Postgres through [Homebrew](https://brew.sh).

```shell
brew install postgres
```

Then start Postgres with the command:

```shell
brew services start postgresql
```

Awesome! Now you'll want to create a database. We call ours `sources`.

```shell
createdb sources
```

##### Windows

We're working on this! If you know how to install Postgres on Windows, please
make a pull request!

Soures uses dotenv. If you're in Daily Bruin, you'll want to
[download our .env file](https://drive.google.com/a/media.ucla.edu/file/d/1la9NABZ5NalqPjhJQsofZM3Y9p8iMGC5/view?usp=sharing).
If you're making your own, the values you'll want are:

```
DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
G_CLIENT_ID=
G_CLIENT_SECRET=
```

### Prerequisites

### Structure

This part is actively being worked on!

```
.
├── Dockerfile
├── LICENSE
├── bin
│   └── www
├── coverage # Generated by Jest for testing coverage
├── designs
│   ├── flowcharts
│   ├── flowcharts.sketch
│   ├── mockups
│   ├── mockups.sketch
│   ├── site-flow.png
│   └── spec.md
├── dist/ # Compiled Typescript code. This is what actually runs on the server.
├── package.json
├── readme.md
├── scripts
│   └── createData.js
├── src
│   ├── app.ts
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── schema
│   └── views
├── tsconfig.json
├── tslint.json
└── yarn.lock # Autogenerated Yarn file.
```

### Technologies

This part is actively being worked on!
