const express = require('express')
const router = express.Router()
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
} = require('../controllers/adminController')

 
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerAdmin)
router.post('/admin-login', loginAdmin)
router.get('/me', protect, getAdmin)


module.exports = router