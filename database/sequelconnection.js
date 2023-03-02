const {Sequelize,DataTypes} = require("sequelize");
const sequelize = new Sequelize(
 'hema',
 'itguser10',
 'miracle@10',
  {
    host: '172.17.15.100',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 module.exports = sequelize;