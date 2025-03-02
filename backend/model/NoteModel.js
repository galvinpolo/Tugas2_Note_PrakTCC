import { Sequelize } from "sequelize";
import db from "../config/database.js"; 

const Note = db.define(
  "notes",
  {
    title: Sequelize.STRING,
    note: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    createdAt: "tanggal_dibuat",
    updatedAt: "tanggal_diubah",
  }
);

export default Note;
(async () => {
  await db.sync();
})();