## Youtube video showcasing the project (in portuguese): url

## About the project

This is a tech challenge for the company sharenergy. The project consists of:
- Create one API with CRUD operations and saving the data in mongodb
- Integrate the server with the [Dog API](https://random.dog/)
- Integrate the server with the [Cat API](https://http.cat/)
- Integrate the server with the [Random User API](https://randomuser.me/) and with search and pagination functionality 
- Login page to have access to the endpoints 
- Doing the frontend in React

## How to run
#### Note
- The project has 2 separate entities, the frontend and backend, let's see how to run the backend first.
- The login functionality requires an username ```desafiosharenergy``` and a password ```sh@r3n3rgy```. However the password stored in the database is hashed, so you need to hash the password using argon2 and store it in the Admin collection. The Admin collection requires a document with the following structure:
```
{ username: String, password: String, session: { token: String, expiresIn: Date }}
```
You can omit the session object since it'll be created automatically once you log in.

## Create database
- Go to the [MongoDB](https://www.mongodb.com/cloud/atlas/register) website and create an account, this project uses the Atlas Cloud Database.
- Follow their tutorial and create a database
- Get your Atlas URI, usually it's something like mongodb+srv://username:[email protected]/Sharenergy?retryWrites=true&w=majority

## Setup enviorement variables
Assuming you just cloned the repository, do the following:

```
$ cd desafio-sharenergy-2023-01/
$ git checkout patrick-dos-reis
$ cd backend/
$ vim .env
```
Inside the .env file, the only variable is the Atlas URI, so the file has to be like this:
```
ATLAS_URI=<your-atlas-uri>
```

## Install backend dependencies
Still inside the backend directory, do the following:
```
$ npm install
```

## Running the dev server
Still inside the backend directory, do the following:
```
$ npm run dev
```

## Compiling and running production server
```
$ npm run build
$ npm start
```

## Install frontend dependencies
In the root folder, do the following:
```
$ cd frontend/
$ npm install
$ npm start
```
