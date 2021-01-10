# lerna-yarn-typescript-webpack

Example for lerna + yarn workspaces + typescript + webpack with build process and docker

## docker build

Before any deployment you must build the base image which installs all the packages and adds the code. If you have installed new packages, don't forget to rebuild the main image using this command:

`docker-compose build main`

Building the packages is done by invoking the `docker-compose build PACKAGE_NAME`. For the server is `docker-compose build server`

Running the built image for `server` package: `docker-compose up server`

Running image for `server` package and building it: `docker-compose up --build server`
