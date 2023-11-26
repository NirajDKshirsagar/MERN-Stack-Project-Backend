const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('../models/adminModel')

// @desc    Register a new admin
// @route   /api/admin
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if admin already exists
  const adminExists = await Admin.findOne({ email })

  if (adminExists) {
    res.status(400)
    throw new Error('Admin already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  })

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    })
  } else {
    res.status(400)
    throw new error('Invalid admin data')
  }
})
// @desc    Login an admin
// @route   /api/admin-login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password, key } = req.body

  const admin = await Admin.findOne({ email })

  
  
  // Check admin,key and passwords match
  if (admin && (await bcrypt.compare(password, admin.password)) && String(key) === String(admin._id))  {
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
    
  }
})

// @desc    Get current admin
// @route   /api/admin/me
// @access  Private
const getAdmin = asyncHandler(async (req, res) => {
  const admin = {
    id: req.admin._id,
    email: req.admin.email,
    name: req.admin.name,
  }
  res.status(200).json(admin)
})

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}



module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmin,
}