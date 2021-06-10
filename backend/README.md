# Tinker API

## Prerequisite
* Run `yarn` to install packages
* Change the database connect configuration in the folder `src/config/config.json`
* You can run `yarn sequelie db:create` if you don't have the database in config file ready

## Docker
This project also comes with `docker-compose` to create a posgres database. You can edit `.env` file to configure the database. The values include:
* `POSTGRES_DB`: database name
* `POSTGRES_USER`: database user
* `POSTGRES_PASSWORD`: user password
Do noted that the configuration need to match with `src/config/config.json` file for the API to connect with.
You can also uncomment the lower parts of `docker-compose.yml` to build and create the API container.

## Migrating and Seeding
You can run the command `yarn start:db` to go through all the migrations and seeding the database with fake user data. The `Users` table will be seeded with 1000 records, generated with `faker.js`.