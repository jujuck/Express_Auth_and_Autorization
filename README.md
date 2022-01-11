# Workshop_MVC_Express
Express en mode MVC avec BDD Mysql

## Objectif
The goal of the workshop is to implement a Express APP with a MVC LIKE Model step by step
In a second time, we will try to implement Authentification with JWT and middleware

## Start
Git clone your project and copy the .env-sample to a .env.... and fill the variable with yours

## Steps
- 1/ Create an express serveur with an app.js file as entry point
- 2/ Create the DB with the SQL file
- 3/ Configurre your connection with a db-config.js file and the package dotenv and mysql2
- 4/ Setup your route in a route folder
- 5/ Create a model folder with a model file in it (Get the name of the table)
- 6/ Create the GET route, using your model to get the data with promise (.then, .catch)
- 7/ Create the GET by Id route, using your :odel file as on top.
- 8/ Improve your GET route with params (?type=""&ph="")
