import { Sequelize } from "sequelize";

const database = new Sequelize("db_users", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default database;
