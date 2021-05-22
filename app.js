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


const mongoUri = process.env.MONGODB_URI
const mongoDatabase = process.env.MONGODB_DATABASE
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

app.listen(3000, () => {
  console.log("Cache API running on port 3000")
  mongoUtil.connect(mongoUri, mongoDatabase, mongoOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB: ', err))
})

module.exports = app
