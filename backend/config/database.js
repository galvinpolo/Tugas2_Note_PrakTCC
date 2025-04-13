import { Sequelize } from "sequelize";

const db = new Sequelize("notes", "root", "", {
  host: "34.56.13.236",
  dialect: "mysql",
});

const testConnection = async () => {
  try {
    await db.authenticate();
    console.log("Database terhubung!");
  } catch (error) {
    console.error("Gagal terhubung ke database:", error.message);
    throw error;
  }
};

testConnection();

export default db;
