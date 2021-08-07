# node_with_jwt_and_cors

This is an example of a simple backend with mongoDB (AtlasDB), bcrypt, JWT aand cors.

Custom variables (.env file):
-
```
DB_ATLAS_DBNAME = yourDBName
DB_ATLAS_PASSWORD = yourDBPassword
DB_ATLAS_USER = yourDBUseer

PORT = 3000

JWT_TOKEN_SECRET = yourSecretKey
SALTSTEPS = 1
```

Install:
-
* git clone https://github.com/TheHandyOwl/node_with_jwt_and_cors.git
* cd node_with_jwt_and_cors
* Create your own '.env' file with your custom values (variables)
* Don't forget to check / change your DB uri connection
* npm install
* npm run dev (to run with nodemon) or ...
* npm start (to run with node as default)

Example link:
-
https://andygeek.com/posts/Mis%20apuntes%20JavaScript/posts/Api-rest-de-login-con-express-mongodb-jwt/

Original github repository:
-
https://github.com/andygeek/backend-auth/

Heroku DEMO
-
Wait a few seconds if the server is down until it reboots:
https://nodewithjwtandcors.herokuapp.com/

