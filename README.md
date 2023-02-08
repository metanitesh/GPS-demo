GPS Demo project

This is a demo project for Emil group. It implements a location service, auth service, and api gaetway for a GPS app.

Installation

docker-compose up

Alternatively 

cd api-gateway ;  npm run dev
cd auth-service ;  npm run dev
cd location-service ;  
npm run dev
docker run -p 27017:27017 -d mongo

Testing functionality

import postman collections (All the endpoints are configured with relevant body)
 
Create a user http://127.0.0.1:3006/auth/create 

req.body example 
{
    "username": "nitesh",
    "password": "sharma"
}

Login http://127.0.0.1:3006/auth/login 

req.body example 
{
    "username": "nitesh",
    "password": "sharma"
}

this will return a token
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pdGVzaCIsImlhdCI6MTY3NTg1NDI5NX0.LFlcgScZSpXEHRqB9Phwx6_L5RahDNnvbeSnyNrZHwA"
}

Add Place http://127.0.0.1:3006/locations/place 

header example - use the token from login
{ authorization : Bearer <token> }

Req.body example
{
  "name": "Studio",
  "lat": 10.2,
  "long":13.2
}

Get Places http://127.0.0.1:3006/locations/places

header example - use the token from login
{ authorization : Bearer <token> }

CI Pipeline
It uses github actions and run build and test for location service

Tests
Location service tests 








