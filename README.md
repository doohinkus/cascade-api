## Run Mongo

cd into the **mongo-apollo** directory
Open terminal

```
npm install
```

And then start mongo server

```
docker-compose -f "./docker-compose.yml" up -d --build
```

This will build and run mongo. See directions below to stop mongo.

## Populate db

With mongo running, run the following command in the **mongo-apollo** folder.

cd into **mongo-apollo**

```
npm run loadCSVtoMongoDB

```

There should be a success message in the console.
With mongo running, run the following command in the **mongo-apollo** folder.

```
npm run start
```

# If there is an issue with npm errors

```
npm ci
```

And then try

```
npm run start
```

## GraphQl tool available here

http://localhost:4000/graphql

## How to stop the mongo instance:

```
docker ps
```

Find the running container, then type:

```
docker stop <first four characters of container id>
```

Run docker ps again to ensure the instance has stopped.

Console should show updates. Stop the server. Then run the following command:

```
npm run start
```

## Graphql queries

http://localhost:4000/graphql

Retrieve days the heat was on.

```
query{
    HeaterTriggeredDates{
        Date
    }
}
```

You can also change the responses. For example, the folowing will add the hasTriggeredAC:

```
query{
    HeaterTriggeredDates{
        Date
        hasTriggeredAC
    }
}
```

you can also click on the tabs to find other options.
