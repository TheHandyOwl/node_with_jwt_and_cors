const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Joi validation module
const Joi = require('joi')

// REGISTER USER
router.post('/register', async (req, res) => {
  // Joi checker
  const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  })

  // Check data first
  const { error } = schemaRegister.validate(req.body, {
    abortEarly: false
  })
  if (error) {
    const errorDetails = error.details.map(item => item.message)
    return res.status(400).json({
      error: errorDetails
    })
  }

  // Check if already exists
  const emailAlreadyExists = await User.findOne({
    email: req.body.email
  })
  if (emailAlreadyExists) {
    return res.status(400).json({
      error: 'Email already exists'
    })
  }

  // Save user
  const saltSteps = parseInt(process.env.SALTSTEPS, 10)
  const salt = await bcrypt.genSalt(saltSteps || 10)
  const password = await bcrypt.hash(req.body.password, salt)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password
  })
  try {
    const savedUser = await user.save()
    res.json({
      error: null,
      data: savedUser
      //data: 'You have sent user credentials'  // Default message
    })
  } catch (error) {
    res.status(400).json({error})
  }
})

// LOGIN USER
router.post('/login', async (req, res) => {
  // Joi checker
  const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  })

  // Check data first
  const { error } = schemaLogin.validate(req.body, {
    abortEarly: false
  })
  if (error) {
    const errorDetails = error.details.map(item => item.message)
    return res.status(400).json({
      error: errorDetails
    })
  }

  // Get user - Check email
  const user = await User.findOne({
    email: req.body.email
  })
  if (!user) {
    return res.status(400).json({
      error: 'User not found'
    })
  }

  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) {
    return res.status(400).json({
      error: 'Invalid password'
    })
  }

  return res.status(200).json({
    error: null,
    message: `Welcome, ${user.name}`
  })
})

module.exports = router