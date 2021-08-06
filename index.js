require('dotenv') .config()

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'It works!',
    port: `${PORT}`
  })
})

const PORT = process.env.PORT ? process.env.PORT : 3001

app.listen( PORT, () => {
  console.log(`Server running on port ${PORT}`)
})