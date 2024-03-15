"use strict";
const { Model } = require("sequelize");
const db = require("../config/database");
module.exports = (sequelize, DataTypes) => {
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
  const Users = db.define("users", {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
  return Users;
};

// firstname: DataTypes.STRING,
// lastname: DataTypes.STRING,
// gender: DataTypes.STRING,
// email: DataTypes.STRING,
// phone: DataTypes.STRING,
// birthdate: DataTypes.DATE,
// password: DataTypes.STRING,
// access_token: DataTypes.TEXT,
// refresh_token: DataTypes.TEXT,
