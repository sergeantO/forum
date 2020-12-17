const { Note } = require("../model/Note");

const create = async (req, res) => {
  const authorId = req.user.id
  let { text, comment, hash, articleId, save: _save, publish } = req.body

  let note
  try {
    note = new Note({
      text, comment, hash, articleId, authorId, _save, publish
    })
  
    note.save()
  } catch(err) {
    res.status(500).json({ error: { err } })
  }
  
  res.status(201).json({ noteId: note.id })
}

const getByUserId = async (req, res) => {
  const userId = req.user.id
  
}

const getByArticleId = async (req, res) => {
  const articleId = req.params.artilceId
  let notes = await Note.find({ articleId, publish: true }).exec()
  notes = notes.map((note) => { 
    return { id: note.id, text: note.text, comment: note.comment }
  })
  res.status(200).json(notes)
}

module.exports = {
  create,
  getByUserId,
  getByArticleId
}