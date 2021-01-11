# lerna-yarn-typescript-webpack

Example for lerna + yarn workspaces + typescript + webpack with build process and docker

**Why yet another repo about the ^^??**

I couldn't find any good resources on how to build docker images from the big monorepo ( more than 12 packages). Majority of the tutorials, posts are about setting it up, which is not that hard to start with, building the quality docker images is a hard, painful and important part of the deploying the microservices and code overall.

This repo is created with the intention to collabrate with other people and finally write the working code that can be used by everyone.

**NOTE** This is completely un-optimised flow. Idea is to make it work, then improve it.

The repo is made out of three packages:

- `client` react based app with apollo-client for graphql communication
- `server` express server with graphql-request package for graphql communication
- `utils` random stuff that is usefull to all packages. This is also a test for the production build where we want that code included, not referenced.

Packages are prefixed with `@app/` and resolved using TS references and paths.

## Building the images

ATM there is fair share of manual work to make this running. All images what you want to build must be included in the `docker-compose.yml` as a service and the `Dockerfile` in the root of the repo as a multistage-image.

We are using the multistage build process where the `main` service is the base image where the packages are installed, cached and built.

Each service is a single multistage-image which is refernced with the `target` option ind he docker-compose file.

If you add more packages under the `packages/` directory you **MUST** reflect that in the `Dockerfile` and `docker-compose.yml`.

To build the main image which every other package uses run `docker-compose build main`.

Building the packages is done by invoking the `docker-compose build PACKAGE_NAME`. For the server is `docker-compose build server`

Running the built image for `server` package: `docker-compose up server`

Running image for `server` package and building it: `docker-compose up --build server`
