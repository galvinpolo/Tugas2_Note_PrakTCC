import Note from "../model/NoteModel.js";

export const getNote = async (req, res) => {
  try {
    const response = await Note.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createNote = async (req, res) => {
  try {
    await Note.create(req.body);
    res.status(201).json({ msg: "Note has been created!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }

    // Update langsung pada instance Note
    Object.assign(note, req.body);
    await note.save();
    res.status(200).json({ message: "Note has been updated!", data: note });
    } 
    
    catch (error) {
    console.error("Terjadi kesalahan saat memperbarui note:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server!" });
  }
};

export const deleteNote = async (req, res) => {
  await Note.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    message: "Note has been deleted!",
  });
};
