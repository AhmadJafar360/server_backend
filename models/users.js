"use strict";
const { Model } = require("sequelize");
module.exports = {
  async up(DataTypes, Sequelize) {
    class Users extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    await DataTypes.init("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
  },

  async down(DataTypes, Sequelize) {
    await DataTypes.dropTable("users");
  },
};

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
//     id= {
//       type: sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
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

// firstname: DataTypes.STRING,
// lastname: DataTypes.STRING,
// gender: DataTypes.STRING,
// email: DataTypes.STRING,
// phone: DataTypes.STRING,
// birthdate: DataTypes.DATE,
// password: DataTypes.STRING,
// access_token: DataTypes.TEXT,
// refresh_token: DataTypes.TEXT,
