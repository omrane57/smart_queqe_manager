#!/bin/bash
set -e

# https://sequelize.org/master/manual/migrations.html

# npx sequelize-cli init
# npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
# npx sequelize-cli db:migrate
# npx sequelize-cli db:migrate:undo
# npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
# npx sequelize-cli seed:generate --name demo-user
# npx sequelize-cli db:seed:all
# npx sequelize-cli db:seed:undo
# npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
# npx sequelize-cli db:seed:undo:all
# npx sequelize-cli migration:generate --name migration-skeleton

#  The default Postgres username is "postgres"

NODE_ENV='local'

SMART_QUEQUE_MANAGER_DB_USERNAME=postgres
SMART_QUEQUE_MANAGER_DB_PASSWORD=postgres
SMART_QUEQUE_MANAGER_DB_NAME=campaign
SMART_QUEQUE_MANAGER_DB_SOCKET_PATH=/cloudsql
SMART_QUEQUE_MANAGER_DB_INSTANCE_URL=localhost
SMART_QUEQUE_MANAGER_DB_PORT=5432

# Creates directory
if [ ! -d ${PWD}/postgres-data/ ]
then
    echo "Creating Directory :: ${PWD}/postgres-data/"
    mkdir ${PWD}/postgres-data/
else
    if [ "$(docker ps -q -f name=dev-pgadmin)" ]
    then
        docker stop dev-pgadmin # stops dev-pgadmin docker container
    fi

    if [ "$(docker ps -q -f name=dev-postgres)" ]
    then
        docker stop dev-postgres # stops dev-postgres docker container
    fi

    if [ "$(docker ps -aq -f status=exited -f name=dev-postgres)" ]; then
        # cleanup
        docker rm -v dev-postgres # removes dev-postgres docker container and volumes associated
    fi

    if [ "$(docker ps -aq -f status=exited -f name=dev-pgadmin)" ]; then
        # cleanup
        docker rm -v dev-pgadmin # removes dev-pgadmin docker container and volumes associated
    fi
    echo "Please, delete Directory :: ${PWD}/postgres-data/"
    exit 1 # If directory ${PWD}/postgres-data/ exists, return exit code 1
fi

# Check for .nvm and install node v20.10.0 using nvm
if [ ! -d ~/.nvm ]
then
    echo "2"
    mkdir ${HOME}/.nvm
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi
source ~/.nvm/nvm.sh

nvm install 20.10.0
nvm use 20.10.0
npm install # Install packages from package.json

# Pull docker images
docker pull postgres
docker pull dpage/pgadmin4

if [ ! "$(docker ps -q -f name=dev-postgres)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=dev-postgres)" ]; then
        # cleanup
        docker rm -v dev-postgres
    fi
    # run your container
    docker run -d --name dev-postgres -e POSTGRES_PASSWORD=$SMART_QUEQUE_MANAGER_DB_PASSWORD -v ${PWD}/postgres-data/:/var/lib/postgresql/data -p 5432:5432 postgres
fi

if [ ! "$(docker ps -q -f name=dev-pgadmin)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=dev-pgadmin)" ]; then
        # cleanup
        docker rm -v dev-pgadmin
    fi
    # run your container
    docker run -p 8090:80 -e 'PGADMIN_DEFAULT_EMAIL=admin@admin.com' -e 'PGADMIN_DEFAULT_PASSWORD=root' --name dev-pgadmin -d dpage/pgadmin4
fi

sleep 10 # waits for 10 sec

# Print IP of Postgres (used in PGAdmin GUI)
ip=$(docker inspect dev-postgres -f "{{json .NetworkSettings.Networks.bridge.IPAddress }}")
echo "$ip"

docker exec -it dev-postgres psql -U postgres -c "CREATE DATABASE $SMART_QUEQUE_MANAGER_DB_NAME;"

# Sync Models
# NODE_ENV=local SMART_QUEQUE_MANAGER_DB_USERNAME=$SMART_QUEQUE_MANAGER_DB_USERNAME SMART_QUEQUE_MANAGER_DB_NAME=$SMART_QUEQUE_MANAGER_DB_NAME SMART_QUEQUE_MANAGER_DB_INSTANCE_URL= SMART_QUEQUE_MANAGER_DB_INSTANCE_URL SMART_QUEQUE_MANAGER_DB_PASSWORD=$SMART_QUEQUE_MANAGER_DB_PASSWORD node ./syncModels.js

# Run migrations for creating tables and their associations

echo "NODE_ENV=$NODE_ENV SMART_QUEQUE_MANAGER_DB_USERNAME=$SMART_QUEQUE_MANAGER_DB_USERNAME SMART_QUEQUE_MANAGER_DB_NAME=$SMART_QUEQUE_MANAGER_DB_NAME SMART_QUEQUE_MANAGER_DB_PASSWORD=$SMART_QUEQUE_MANAGER_DB_PASSWORD SMART_QUEQUE_MANAGER_DB_SOCKET_PATH=$SMART_QUEQUE_MANAGER_DB_SOCKET_PATH SMART_QUEQUE_MANAGER_DB_INSTANCE_URL=$SMART_QUEQUE_MANAGER_DB_INSTANCE_URL SMART_QUEQUE_MANAGER_DB_PORT=$SMART_QUEQUE_MANAGER_DB_PORT npx sequelize-cli db:migrate";
NODE_ENV=$NODE_ENV SMART_QUEQUE_MANAGER_DB_USERNAME=$SMART_QUEQUE_MANAGER_DB_USERNAME SMART_QUEQUE_MANAGER_DB_NAME=$SMART_QUEQUE_MANAGER_DB_NAME SMART_QUEQUE_MANAGER_DB_PASSWORD=$SMART_QUEQUE_MANAGER_DB_PASSWORD SMART_QUEQUE_MANAGER_DB_SOCKET_PATH=$SMART_QUEQUE_MANAGER_DB_SOCKET_PATH SMART_QUEQUE_MANAGER_DB_INSTANCE_URL=$SMART_QUEQUE_MANAGER_DB_INSTANCE_URL SMART_QUEQUE_MANAGER_DB_PORT=$SMART_QUEQUE_MANAGER_DB_PORT npx sequelize-cli db:migrate

# Seeds all tables with some data
echo "NODE_ENV=$NODE_ENV SMART_QUEQUE_MANAGER_DB_USERNAME=$SMART_QUEQUE_MANAGER_DB_USERNAME SMART_QUEQUE_MANAGER_DB_NAME=$SMART_QUEQUE_MANAGER_DB_NAME SMART_QUEQUE_MANAGER_DB_SOCKET_PATH=$SMART_QUEQUE_MANAGER_DB_SOCKET_PATH SMART_QUEQUE_MANAGER_DB_INSTANCE_URL=$SMART_QUEQUE_MANAGER_DB_INSTANCE_URL SMART_QUEQUE_MANAGER_DB_PORT=$SMART_QUEQUE_MANAGER_DB_PORT SMART_QUEQUE_MANAGER_DB_PASSWORD=$SMART_QUEQUE_MANAGER_DB_PASSWORD npx sequelize-cli db:seed:all"
NODE_ENV=$NODE_ENV SMART_QUEQUE_MANAGER_DB_USERNAME=$SMART_QUEQUE_MANAGER_DB_USERNAME SMART_QUEQUE_MANAGER_DB_NAME=$SMART_QUEQUE_MANAGER_DB_NAME SMART_QUEQUE_MANAGER_DB_SOCKET_PATH=$SMART_QUEQUE_MANAGER_DB_SOCKET_PATH SMART_QUEQUE_MANAGER_DB_INSTANCE_URL=$SMART_QUEQUE_MANAGER_DB_INSTANCE_URL SMART_QUEQUE_MANAGER_DB_PORT=$SMART_QUEQUE_MANAGER_DB_PORT SMART_QUEQUE_MANAGER_DB_PASSWORD=$SMART_QUEQUE_MANAGER_DB_PASSWORD npx sequelize-cli db:seed:all