# Parking System

## How to run locally
- make sure you have mongoDB installed and running on port 27017
- preferably use node version 8.12
- make sure that the hostname in db/mongoose.js is set to localhost
- to run locally run 
```
    node index.js
```

## Flow of creating a booking for a parking spot
- First create a driver using: "/driver/create"
    - the api contract is as follows:
    ```
    {
        POST
        "isReservingASpot": boolean,
        "coordinates": [longitude, latitude]
    }
    ```
    - the isReservingASpot shows whether the driver is reserving a spot currently, and it defaults to false
    - coordinates shows the longitude and latitude on 2d sphere
- Create a parking spot using "/parkingSpot/create"
    - the api contract is as follows
    ```
    {
        POST
        "isFree": boolean,
        "coordinates": [longitude, latitude]
    }
    ```
    - the isFree shows whether the parking spot is free currently or not, and it defaults to true
    - coordinates shows the longitude and latitude on 2d sphere
- List the near parking spots using "/parkingSpot/getNearSpots"
    - the api contract is as follows:
    ```
    {
        POST
        "driverId": ObjectId,
    }
    ```
- Book a free parking spot using "/bookingSpot/create"
    - the api contract is as follows
    ```
    {
        POST
        "driverId": ObjectId,
        "parkingSpotId": ObjectId
    }
    ```
- Delete a booking of the parking spot using "bookingSpot/delete"
    - the api contract is as follows
    ```
    {
        POST
        "driverId": ObjectId,
        "parkingSpotId": ObjectId
    }
    ```
- To deploy the parking system, 
    - First, change the "localhost" in the db/mongoose.js file to be ${process.env.DB_HOST} and then use the docker-compose file by running this command:
    ```
        docker-compose up -d 
    ```
    - this will deploy two containers, one is the backend system container and the other is the mongodb contanier