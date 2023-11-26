const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get notes for a ticket
// @route   GET /api/data/admin-resolve/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)


  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})

// @desc    Create ticket note
// @route   POST /api/data/admin-resolve/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)

  const note = await Note.create({
    text: req.body.text,
    ticket: req.params.ticketId,
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}