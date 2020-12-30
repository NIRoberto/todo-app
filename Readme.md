![GitHub  CI](https://github.com/NIRoberto/todo-app/workflows/GitHub%20%20CI/badge.svg)
# Todo app for wrestles names


This application will allow users to generate his/her favorite wrestles, will be able to update, delete, display names  of these wrestles.

## Technology used are

- Node
- es6
- Postgres
- Sequilize
- Express
- Mocha & chai

## Get started

### Prerequisites

Ensure that you have already installed a  Node in your machine otherwise you will not be able to use this todo app. If it is installed check the version by using `node -v` command  in your terminal. If not install it.

### Installation
Clone the app

 - `git clone https://github.com/NIRoberto/todo-app.git`

Install all the packages

- `npm install`

Run the server 
 
 - `npm start`

 ### Testing 

 - `npm run test`

## Endpoint found on this app
| Endpoint | Functionalities |
| --- | --- |
| POST /api/v1/todo/signup | Signup for new  todo app users|
| POST /api/v1/todo/login | Login for todo app users|
| POST /api/v1/todo/create | create a wrestle names |
| GET /api/v1/todos/  | Get all names of wrestles you have created |
| GET /api/v1/todo/:id | Get names of wrestles by using id|
| DELETE /api/v1/todo/:id | Delete names of wrestles by using id|
| PUT /api/v1/todo/:id | UPDATE names of wrestles by using id|

## API documentation 
- API documentation can be found here  


## Author 

**Robert Niyitanga**






