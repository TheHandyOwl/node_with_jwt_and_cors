const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({
      error: 'Access denied'
    })
  }

  try {
    const verifiedToken = jwt
      .verify(token, process.env.JWT_TOKEN_SECRET)
    req.user = verifiedToken
    next()
  } catch (error) {
    return res.status(400).json({
      error: `Invalid token: ${error}`
    })
  }
}

module.exports = checkToken