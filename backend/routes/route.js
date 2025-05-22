import express from 'express';
import { getNote, createNote, updateNote, deleteNote } from "../controllers/NoteController.js";
import { getUsers, createUser, loginHandler, logout, } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// CRUD Note
router.get ("/note", getNote);
router.post ("/add-note", createNote);
router.put ("/update-note/:id", updateNote);
router.delete ("/delete-note/:id", deleteNote);

// Endpoint User
router.get("/users", getUsers);
router.post("/create-users", createUser);
router.post("/login", loginHandler);
router.post("/logout", verifyToken, logout);

export default router;