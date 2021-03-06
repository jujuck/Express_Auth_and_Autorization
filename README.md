# Workshop_MVC_Express
Express en mode MVC avec BDD Mysql

## Objectif
The goal of the workshop is to implement a Express APP with a MVC LIKE Model step by step
In a second time, we will try to implement Authentification with JWT and middleware

## Start
Git clone your project and copy the .env-sample to a .env.... and fill the variable with yours

## Part 1 => MVC Like
You can watch this part on this video (https://drive.google.com/file/d/11ZGfjYAY6rirnEaEb4diYOUK6Qy65gxX/view?usp=sharing
- 1/ Create an express serveur with an `app.js `file as entry point
- 2/ Create the DB with the SQL file
- 3/ Configure your connection with a `db-config.js` file and the package *dotenv* and *mysql2*
- 4/ Setup your route in a route folder
- 5/ Create a model folder with a model file in it (Get the name of the table)
- 6/ Create the GET route, using your model to get the data with promise (.then, .catch)
- 7/ Create the GET by Id route, using your model file as on top.
- 8/ Improve your GET route with params (?type=""&ph="")

## Part 2 => Middleware and Auth with JWT
You can watch the first point on this video (https://drive.google.com/file/d/1wjsfr59HWM5zAVGzvLS3IWrkDBEq1QcI/view?usp=sharing)
- 1/ Create a new file `auth.js` in the route folder and add a post method on */signin*. Don't forget to add the reference on the `index.js`
    ```
    const beersRouter = require('./beers');
    const authRouter = require('./auth');

    const setUpRoutes = (app) => {
      app.use('/beers', beersRouter)
      app.use('/auth', authRouter)
    };

    module.exports = {
      setUpRoutes
    }
    ```
    - Create a new table for the user with an unique *id*, unique *email* and *hashedpassword*
    - Create a function to hash the password with `àrgon`
    - Insert into the table the *email* and *hashedpassword* (Check the error as email already exist, and so on);
    We can now register ourself!!! Now, can we login
You can watch this part https://drive.google.com/file/d/1KJeLrS4za4qft18Osvvrz7jhxyob5PZq/view?usp=sharing
- 2/ In the same file, add a */login* route.
      - Create a find one method to get the *password* from the *email* in an user model file. If the email doesn't exist, stop the process with a correct message
      - Otherwise, compare the *hashpassword* with the plain password from the body
      - If true => send a connected connexion, else Invalid credentials
- 3/ If connection is accepted, we want to send a cookies with a JWT
      - First, load the `jsonwebtoken` package and import it in a new file users.js in a helpers Folder
      - Declare a private Key in your `.env` and import it in your `helpers/users.js`
      - Create a function with the *email* to create a token (Have a look at the method of jwt) and export it
      - Import the method in the `routes/auth.js` and use it to calculate a token
      - Put it in a cookies method with params (httpOnly : true, expires: 24h)
- 4/ Now, restructure your projet to put the code to check the password in a middleware and keep only the return statement in the route

## Last step Authorization
You can follow part on this video https://drive.google.com/file/d/1k2TOXDGfIvKrcm_ttYH9IoJXtRnfnujZ/view?usp=sharing
- 5/ In the `routes/beers.js`, add a route post in it.
- 6/ Implement a middleware in it, to check if the user is correctly connected before going to the post query. You should first checked the presence of the cookie (Don't forget to install and use the package cookie-parser), and then its validity.
- 7/ If the user is correctly connected, then check the data send with the `joi` package with a middleware
- 8/ Do the same to implement the put route and delete with the specific id in params... (Try to reuse the middleware to check the data on the `put route`
