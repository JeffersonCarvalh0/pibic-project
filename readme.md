[![CircleCI](https://circleci.com/gh/JeffersonCarvalh0/pibic-project.svg?style=shield)](https://circleci.com/gh/JeffersonCarvalh0/pibic-project)

# ts-rest-boilerplate
This is a boilerplate for REST APIs written in TypeScript and built with Express
which uses MongoDB as its database.
It comes with some example code that manipulates cats objects in the database.

# Prerequisites
Apart from `npm` and `node`, the only thing needed is `MongoDB` installed and
running in your computer.

# Contents
## Project structure

    .
    ├── dist
    ├── src
    │   ├── controllers
    │       ├── auth.controller.ts
    │       └── cat.controller.ts
    │   ├── db
    │       ├── cat.db.ts
    │       └── user.db.ts
    │   ├── routes
    │       ├── auth.routes.ts
    │       └── cat.routes.ts
    │   ├── test
    │       └── cat.spec.ts
    │   ├── app.ts
    │   ├── auth.ts
    │   ├── config.ts
    │   └── server.ts
    ├── LICENSE
    ├── nodemon.json
    ├── package.json
    ├── tsconfig.json
    └── README.md

## Packages
### Dependencies
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Library to hash passwords
* [body-parser](https://github.com/expressjs/body-parser) - Middleware to parse incoming requests bodies
* [express](https://github.com/expressjs/express) - Web framework
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens
* [mongoose](https://github.com/Automattic/mongoose/) - A MongoDB object modeling tool
* [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware
* [passport](https://github.com/jaredhanson/passport) - Authentication middleware
* [passport-jwt](https://github.com/themikenicholson/passport-jwt) - Passport strategy for authentication via JSON Web Token
* [passport-local](https://github.com/jaredhanson/passport-local) - Passport strategy for authenticating with a username and password

### Dev Dependencies
* [typings](https://github.com/DefinitelyTyped/DefinitelyTyped) - Typings of the other packages for a better integration with TypeScript
* [chai](https://github.com/chaijs/chai) - BDD/TDD assertion framework
* [chai-http](https://github.com/chaijs/chai-http) - HTTP integration with chai assertions
* [mocha](https://github.com/mochajs/mocha) - JavaScript test framework
* [mocha-typescript](https://github.com/pana-cc/mocha-typescript) - Allows to write mocha tests in TypeScript
* [nodemon](https://github.com/remy/nodemon/) - Monitor for any changes in the application and automatically restarts the server
* [ts-node](https://github.com/TypeStrong/ts-node) - TypeScript execution and REPL
* [typescript](https://github.com/Microsoft/TypeScript) - Superset of JavaScript

## Files
### Root

#### [nodemon.json](nodemon.json)
The configuration file for `nodemon`.

#### [package.json](package.json)
In this file, you can find the NPM configurations for the project, along with
its dependencies. Here you might want to change the project's name, description,
author and license. As you can notice, it also comes with some scripts:
* `npm build` will use `tsc` to transpile the app to the `dist` folder.
* `npm start` will run the server from the `js` code in `dist`.
* `npm run start-dev` will run the server directly from `ts` code using
`ts-node`. There is no need to build the app to use this command, and it
restarts automatically thanks to `nodemon`.
* `npm test` will run the tests located in `test` folder Again, there is no
need to build the app since the tests are written in `ts` and the code will
be executed by `ts-node`.

#### [tsconfig.json](tsconfig.json)
The configuration file for `tsc`, the TypeScript compiler. It was generated
using the command `tsc --init`.

### [src](src)
The main folder of the application. You can find its source code here.

#### [app.ts](src/app.ts)
Here the `express` app will be created and instantiated, and the middlewares will
be set. The example routes are being added to the app, and the connection with
the example database is being done.

#### [auth.ts](src/auth.ts)
In this file, the `passport` strategies are being configured. The `LocalStrategy`
checks the recieved username and password with the ones saved in the example database.
The `JwtStrategy` checks if the JWT was signed with the app's secret key, decrypt it
and then check if the username which was embedded in the JWT is valid.

#### [config.ts](src/config.ts)
Here the app's configs are stored. You will find configurations for development,
tests and production. This file is imported when the configs are needed, and it
will export the config depending on what is set in the `process.env.NODE_ENV`
variable. Notice that the scripts in `package.json` are setting this variable before
executing the app.

#### [server.ts](src/server.ts)
In this file the `https` server is bootstraped. You will need the files for
the certificate, which can be generated using the following commands executed
from root:
```
    openssl genrsa -out localhost.key 2048
    openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost
```
Notice that this key is self signed and should only be used in development, and not in production.

### [src/controllers](src/controllers)
Here you can put the controllers for your routes.

#### [auth.controller.ts](src/controllers/auth.controller.ts)
This is the authentication controller. It has a controller for a login route which uses the
`local` strategy and returns a JWT to the client. It also has a register controller for new
users and a controller to test whether the authentication was successful, checking the JWT
sent by the user. Notice that in this one, the code that tells this route should be proceted
is in `app.ts`.

#### [cat.controller.ts](src/controllers/cat.controller.ts)
Controller for cat's routes. It performs some basic CRUD operations as examples.

### [src/db](src/db)
Here you can declare mongoose `models` and `schemas`, along with their TypeScript interfaces.

#### [cat.db.ts](src/db/cat.db.ts)
Here you can find mongoose stuff for the cats.

#### [user.db.ts](src/db/user.db.ts)
The same as before, but now for users in the database. Notice the `pre` and `compare`
methods of the `schema`. They hash the password before it is store and compare it with
the password given by an user, respectively.

### [src/routes](src/routes)
Here you can write your routes. You can follow the examples already presented here.
Don't forget to bootstrap them in `app.ts`.

#### [auth.routes.ts](src/routes/auth.routes.ts)
Routes for login, register and testAuth.

#### [cat.routes.ts](src/routes/cat.routes.ts)
Routes for the cat's CRUD.

### [test](src/test)
Here you can put your tests. They will be executed running `npm test`.
By using `mocha-typescript`, you can write them in TypeScript, and thanks to
`ts-node` you can run them without compiling.

#### [cat.spec.ts](src/test/cat.spec.ts)
In this file you can find some examples of unitary tests.
