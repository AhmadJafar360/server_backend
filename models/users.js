import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql:root:VGNnltNafKcBycscnUiVElAFzoJjYbUq@monorail.proxy.rlwy.net:33259/railway");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  gender: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  birthdate: DataTypes.DATE,
  password: DataTypes.STRING,
  access_token: DataTypes.TEXT,
  refresh_token: DataTypes.TEXT,
});

export default User;

// "use strict";
// const {
//   Model
// } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Users extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Users.init(
//     {
//       firstname: DataTypes.STRING,
//       lastname: DataTypes.STRING,
//       gender: DataTypes.STRING,
//       email: DataTypes.STRING,
//       phone: DataTypes.STRING,
//       birthdate: DataTypes.DATE,
//       password: DataTypes.STRING,
//       access_token: DataTypes.TEXT,
//       refresh_token: DataTypes.TEXT,
//     },
//     {
//       sequelize,
//       modelName: "users",
//     }
//   );
//   return Users;
// };
