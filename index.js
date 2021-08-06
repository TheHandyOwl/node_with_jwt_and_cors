require('dotenv') .config()

const express = require('express')
const app = express()

const authRoutes = require('./routes/auth')

const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASSWORD}@midudevfsb.fhvt9.mongodb.net/${process.env.DB_ATLAS_DBNAME}?retryWrites=true&w=majority`

mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log(`Connected to AtlasDB`)
  })
  .catch((err) => {
    console.log(`AtlasDB error`, err)
    client.close()
  })

// To read json objects
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Auth routes
app.use('/api/user', authRoutes)

// Default routes
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'It works!',
    port: `${PORT}`
  })
})

const PORT = process.env.PORT ? process.env.PORT : 3000

app.listen( PORT, () => {
  console.log(`Server running on port ${PORT}`)
})