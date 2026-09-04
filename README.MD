# Financial Tracker Application

This project is about the Financial Tracker to users who spend money every day. This will show every transaction of their expense and growing base on date. In addition, users are able to delete their translation. Users can view the Link graph based on their income, net worth and expense base on date.

![Websute Screenshort]()

## Table of Contents

- [Introduction](#introduction)
- [Features](#featuers)
- [Technoloies Used](#technologies-used)
- [How to Use](#how-to-use)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This project is build with React JS, Node.js+express.js, MongoDB and deployed via GitHub.

[Visit Live Website](#)

## Featuers

- **Responsive Design**:

## Technologies used

- ## **Frontend**:
  - React JS
  - Contact API
  - Bootstrap in React
  - React-Toastify
  - React-icon
  - React API call endpoint axios
- **REST API**:
  - Postman for tesing
  - REST extention install in VS-code
- **Backend**:
  - Node.js, express.js
  - JWT decoded
- **Database**:
  - MongoDB
- ## **Deployment**
  - Github, vercel or render

## How to use?

To set up this project in your device locally, please follow the steps:

1.  **Clone the respository**:
    run the following command in your terminal:
    > ```
    >   git clone https://github.com/yadin-nou/backend-ft
    >   git clone https://github.com/yadin-nou/finance-tracker
    > ```
2.  **Navigate to the project directory**:
    > ```
    >   cd yadin-nou
    > ```
3.  **Install Dependencies**:
    - ### Backend
      > ```
      > yarn add express.js
      > ```
      >
      > ```
      > yarn add nodemon
      > ```
      >
      > ```
      > yarn add cors
      > ```
      >
      > ```
      > yarn add bcrypt
      > ```
      >
      > ```
      > yarn add moongoose
      > ```
      >
      > ```
      > yarn add morgan
      > ```
    - ### Frontend
      > ```
      > yarn add axios
      > ```
      >
      > ```
      > yarn add booststrap bootstrap
      > ```
      >
      > ```
      > yarn add react-toastify
      > ```
      >
      > ```
      > yarn add ract-icon
      > ```
      >
      > ```
      > yarn add rect-router-dom
      > ```
      >
      > ```
      > yarn add jsonwebtoken
      > ```
4.  **Run the development server**:
    > ```
    >   yarn dev
    > ```

## Usage

- Postman for tesing
- REST extention rest.http

## API Endpoints

    List all the api Endpoint you are going to have

## Enviroment Variables

Create a .env file in the root fo your project and add the following environment variables:

## Project Workflow

- **Trasaction Page**:
  - Create trasaction form
    - type (income,expense)
    - description
    - amount
    - date
  - Validate form
  - Handle adding transaction into Database
  - Create controller
  - Auth & Middleware
  - Receive data and userId
  - Response message
- **Display Transaction to Table**
  - Create getTrasaction Model
  - Create getTrasaction fuction in Transaction Router
  - REST API test
  - Create table component
  - create API call Axios to server
  - Display data in table list

## Project Structure

```
FT Backend
|-- public
|-- src
| |-- config
| | |-- db.config.js
| |-- models
| | |-- userModel.js
| | |-- userSchema.js
| |-- router
| | |-userRouter.js
| |-- utils
| | |-pwdHashEncryption.js
```

```
FT Frontend
|-- public
|-- src
| |-- assets
| | |--
| |-- axiosHelper
| | |-- axiosConnection.js
| |-- component
| | |--Layout
| | | |--FormTempalte.jsx
| | | |--LoginFormLayout.jsx
| | | |--TipContext.jsx
| | | |--UserForms.jsx
| |-- hooks
| | |--useFormHook.js
| |-- pages
| | |--LoginPage.js
| | |--SignUp.js

```

## Contributing

## License

## Contact
