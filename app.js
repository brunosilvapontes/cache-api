require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cacheRouter = require('./routes/cache')
const mongoUtil = require('./infrastructure/mongo-util')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/cache', cacheRouter)

// Mandatory environment variables
if (!process.env.MONGODB_DATABASE) {
  throw Error('missing MONGODB_DATABASE env var')
}
if (!process.env.MONGODB_URI) {
  throw Error('missing MONGODB_URI env var')
}

// Cache keys limit
if (!process.env.CACHE_KEYS_LIMIT) {
  // Default cache keys limit
  process.env.CACHE_KEYS_LIMIT = '5'
} else if (isNaN(Number(process.env.CACHE_KEYS_LIMIT))) {
  throw Error('CACHE_KEYS_LIMIT env var must be a valid number')
} else if (Number(process.env.CACHE_KEYS_LIMIT) < 1) {
  throw Error('CACHE_KEYS_LIMIT must be a positive number')
}

// MongoDB connection information
const mongoUri = process.env.MONGODB_URI
const mongoDatabase = process.env.MONGODB_DATABASE
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

app.listen(3000, () => {
  console.log('Cache API running on port 3000')
  console.log(`Cache keys limit: ${process.env.CACHE_KEYS_LIMIT}`)
  mongoUtil.connect(mongoUri, mongoDatabase, mongoOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB: ', err))
})

module.exports = app
