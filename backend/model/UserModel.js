import { Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define(
    "users",{
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        createdAt: "tanggal_dibuat",
        updatedAt: "tanggal_diubah",
    }
);

export default User;

(async () => {
    await db.sync();
})();