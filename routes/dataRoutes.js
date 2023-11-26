const express = require('express')
const router =  express.Router()
const {getAll,updateStatus, openStatus} = require('../controllers/dataController')
const noteRouter = require('./noteRoutes')

//Re-route into notes
router.use('/admin-resolve/:ticketId/notes', noteRouter)

router.get('/admin-resolve',getAll)
router.put('/admin-resolve/:id',updateStatus)
router.put('/admin-resolve/open/:id',openStatus)

module.exports = router