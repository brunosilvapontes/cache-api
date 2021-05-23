const express = require('express')
const router = express.Router()
const getKeyDataController = require('../controllers/getKeyData')
const getKeysController = require('../controllers/getKeys')

router.get('/key/:key', async (req, res) => {
  try {
    const { status, data } = await getKeyDataController(req.params.key)
    return sendResponse({ data, res, status })
  } catch (err) {
    return sendResponse({
      res,
      status: 500,
      data: `Unexpected error: ${err}`
    })
  }
})

router.get('/keys', async (req, res) => {
  try {
    const { status, data } = await getKeysController()
    return sendResponse({ data, res, status })
  } catch (err) {
    return sendResponse({
      res,
      status: 500,
      data: `Unexpected error: ${err}`
    })
  }
})

sendResponse = ({ res, status = 200, data }) => {
  return res.status(status).json(data).end()
}

module.exports = router
