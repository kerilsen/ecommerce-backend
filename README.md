# E-Commerce Backend

  ## Description

  ![License: MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

  GitHub repository: [https://github.com/kerilsen/ecommerce-backend](https://github.com/kerilsen/ecommerce-backend)

  Walkthrough link: [E-Commerce Backend Walkthrough Video](https://drive.google.com/file/d/1YvVqYMQuImBXADze2pIdM9qb9IshZwQQ/view)

  This is the back end for an e-commerce site using Express.js, MySQL and Sequelize. I was motivated to understand the fundamental architecture of e-commerce sites as well as learn how to utilize Sequelize models and asynchronous functions. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

  ## Installation

  1. At the root directory of the project, type 'npm init -y' 
  2. Type 'npm i' 
  3. Create a .env file in your root directory with 
  * DB_NAME='ecommerce_db'
  * DB_USER='root'
  * DB_PASSWORD=[YOUR PASSWORD]
  * PORT='3001'
  4. Type 'mysql -u root -p' and then enter your password for mysql 
  5. Type 'source db/schema.sql' 
  6. Type 'exit;' to get out of mysql 
  7. Type 'npm run seed' to seed the database 
  8. Type 'npm run watch' to use nodemomn to monitor the server 
  9. Use your browser or Insomnia to check routes such as 'http://localhost:3001/api/categories' to get a list of all of the categories.

  ## Usage

  Please see the step by step instructions above to run the application and then open Insomnia and navigate to http://localhost:3001/. 
  You are able to use 'POST', 'PUT', 'GET', AND 'DELETE' at the api/products, api/categories and api/tags endpoints.

  ## Contributing

  I discovered Xpert Learning Assistant (AI assistance) for this project and learned a lot about asynchronous functions and sequelize and debugging through this process.

  ## License

  [License: MIT License](https://opensource.org/licenses/MIT)

  ## Tests

  I used Insomnia for testing and have included a [walkthrough video](https://drive.google.com/file/d/1YvVqYMQuImBXADze2pIdM9qb9IshZwQQ/view).

  ## Questions

  If you have any questions about this project, please contact me at keri.l.sen@gmail.com.

  My GitHub profile is at: [https://github.com/kerilsen](https://github.com/kerilsen)
