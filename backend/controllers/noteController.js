import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";

//the note controller file interacts with the notesActino file and controls the the action file what to do or get

// @desc    Get logged in user notes
// @route   GET /api/notes
// @access  Private

// this finds the notes in mongodb (this section is editied to get all the notes in the database)
const getNotes = asyncHandler(async (req, res) => {
  //
  const notes = await Note.find();
  res.json(notes);
});

//@description     Fetch single Note
//@route           GET /api/notes/:id
//@access          Public

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

//create note into mongo db
//@description     Create single Note
//@route           GET /api/notes/create
//@access          Private
const CreateNote = asyncHandler(async (req, res) => {
  const { title, authors, source, pubYear, doi } = req.body;

  if (!title || !authors || !source || !pubYear || !doi) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({
      user: req.user._id,
      title,
      authors,
      source,
      pubYear,
      doi,
    });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

//@description     Delete single Note
//@route           GET /api/notes/:id
//@access          Private
const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const UpdateNote = asyncHandler(async (req, res) => {
  const { title, authors, source, pubYear, doi } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.authors = authors;
    note.source = source;
    note.pubYear = pubYear;
    note.doi = doi;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote };
