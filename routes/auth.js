const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Joi validation module
const Joi = require('joi')

// Joi checker
const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
})

router.post('/register', async (req, res) => {
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

module.exports = router