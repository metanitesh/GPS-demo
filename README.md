# GPS Demo Project
This demo project is developed for the Emil group and provides a location service, authentication service, and API gateway for a GPS app.

## Architecture
![alt text](https://github.com/metanitesh/GPS-demo/blob/add-readme/diagram.png)


## Installation
To install the demo project, run the following command:

`docker-compose up`

If docker-compose is not avaliable please install [docker-desktop](https://www.docker.com/products/docker-desktop/)

Alternatively, you can also run the following commands:

`cd api-gateway ; npm install ; npm run dev` \
`cd auth-service ; npm install ; npm run dev` \
`cd location-service ; npm install ; npm run dev` \
`docker run -p 27017:27017 -d mongo` 



## API gateway endpoing 

To test the functionality of the demo project, import the [postman collections](https://github.com/metanitesh/GPS-demo/blob/add-readme/emil-api.json) All the endpoints are already configured with relevant request bodies.

### Create a user
To create a user, make a POST request to `http://127.0.0.1:3006/auth/create` with request body example


`{
  "username": "nitesh",
  "password": "sharma"
}`

### Login
To log in, make a POST request to `http://127.0.0.1:3006/auth/login` with the following request body example:


`{ 
  "username": "nitesh", 
  "password": "sharma" 
}`

This will return a token in the following format:

`{ 
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pdGVzaCIsImlhdCI6MTY3NTg1NDI5NX0.LFlcgScZSpXEHRqB9Phwx6_L5RahDNnvbeSnyNrZHwA" 
}`

### Add a Place
To add a place, make a POST request to http://127.0.0.1:3006/locations/place with the following header and request body examples, use the token from login service:

Header:
`{ 
  authorization: "Bearer {token}"
}`

Request Body:

`{ 
  "name": "Studio", 
  "lat": 10.2, 
  "long": 13.2 
}`

### Get places
To get all places, make a GET request to http://127.0.0.1:3006/locations/places with the following header:

Header:
`{ 
  authorization: "Bearer {token}"
}`


## CI Pipeline
The demo project uses GitHub Actions to run builds and tests for the location service, this happens everytime a pull request is created

## Tests
The demo project includes tests for the location service.





