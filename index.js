require('dotenv') .config()

const cors = require('cors')

const express = require('express')
const app = express()

// CORS
const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// Middlewares
const checkToken = require('./middlewares/checkToken')

// Routes
const authRoutes = require('./routes/auth')
const protectedDashboardRoutes = require('./routes/protectedDashboard')

// Mongoose
const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASSWORD}@midudevfsb.fhvt9.mongodb.net/${process.env.DB_ATLAS_DBNAME}?retryWrites=true&w=majority`

mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log(`Connected to AtlasDB`)
  })
  .catch((err) => {
    console.log(`AtlasDB error`, err)
  })

// To read json objects
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Middlewares
app.use('/api/dashboard', checkToken, protectedDashboardRoutes)

// Routes// Auth routes
app.use('/api/user', authRoutes)

// Default routes
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'It works!',
    port: `${PORT}`
  })
})

const PORT = parseInt(process.env.PORT, 10) ? parseInt(process.env.PORT, 10) : 3000

app.listen( PORT, () => {
  console.log(`Server running on port ${PORT}`)
})