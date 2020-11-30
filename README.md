# API
### This REST API was made in nodeJS with express, mongoose, JWT, bcrypt and uses the non-relational database mongoDB

# To running this API in your computer

## Install the dependencies
### npm install

## You will need to have the MongoDB running
### mongod

## Create the .env file and add the variables:
### PORT
### MONGO_URL
### JWT_SECRET_KEY
### JWT_SECRET_ADMIN_KEY

## ROUTES

### GET- / - It's main
### POST- /add - It's for create a new user
### POST- /login - It's for logging into the app
### GET- /post - It's show the publications
### POST- /post/add - It's for create a new publications
### POST- /post/idofpublication - It's for show a specific publication
### PUT- /post/update/idofpublication - It's for update a specific publication
### DELETE- /post/delete/idofpublication - It's for delete a specific publication
### GET- /admin  -It's show the users
### GET- /admin/idofuser - It's for show a specific user
### DELETE- /admin/delete/idofuser - It's for delete a specific user
### PUT- /admin/update/idofuser - It's for update a specific user
### POST- /admin/add - It's for add a new user
### GET- /admin/post - It's show the posts
### GET- /admin/post/idofpublication - It's show a specific publication
### PUT- /admin/post/update/idofpublication - It's for update a specific publication
### DELETE- /admin/post/delete/idofpublication - It's for delete a specific publication
