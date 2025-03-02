import express from 'express';
import { getNote, createNote, updateNote, deleteNote } from "../controllers/NoteController.js";

const router = express.Router();

router.get ("/note", getNote);
router.post ("/add-note", createNote);
router.put ("/update-note/:id", updateNote);
router.delete ("/delete-note/:id", deleteNote);

export default router;