import {Sequelize} from "sequelize";

const connection = new Sequelize({
    database: process.env.DB_DATABASE,
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
})

connection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
});

export {connection};