const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })

  res.status(201).json(ticket)
})

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

    if (!deletedTicket) {
      // If the document was not found, return a 404 status code
      return res.status(404).json({
        status: 'Not Found',
        message: 'Ticket not found',
      });
    }

    res.status(204).json({
      status: 'Success',
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});



// @desc    Update ticket
// @route   PUT /api/tickets/update-ticket/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // Create a filter object using the ticket's ID
  const filter = { _id: req.params.id };

  // Create an update object with the description field
  const update = { description: req.body.description };

  // Use the updateOne method to update the ticket
  const updatedTicket = await Ticket.updateOne(filter, update);

  // Check if the update was successful
  if (updatedTicket.nModified === 1) {
    // Ticket was updated successfully
    res.status(200).json({ success: true, message: 'Ticket updated' });
  } else {
    // No ticket was updated (maybe due to no changes in description)
    res.status(200).json({ success: true, message: 'No changes made to the ticket' });
  }
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
