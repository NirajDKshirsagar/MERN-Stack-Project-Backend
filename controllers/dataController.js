const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')

const getAll = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find().populate('user')
  
    res.status(200).json(tickets)
  })

// @desc    Update status
// @route   PUT /api/data/admin-resolve/:id
// @access  Private
const updateStatus = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;

  const ticket = await Ticket.findByIdAndUpdate(
    ticketId,
    { status: 'closed' },
    { new: true } // This option ensures that the updated ticket is returned
  )

  // Ticket was updated successfully
  res.status(200).json({ success: true, message: 'Ticket status updated to closed', ticket });
})

// @desc    Open status
// @route   PUT /api/data/admin-resolve/:id
// @access  Private
const openStatus = asyncHandler(async (req, res) => {
  const ticketId = req.params.id;

  const ticket = await Ticket.findByIdAndUpdate(
    ticketId,
    { status: 'open' },
    { new: true } // This option ensures that the updated ticket is returned
  )

  // Ticket was updated successfully
  res.status(200).json({ success: true, message: 'Ticket status updated to open', ticket });
});





module.exports = {getAll,updateStatus,openStatus}