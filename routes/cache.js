const express = require('express')
const router = express.Router()
const getKeyDataController = require('../controllers/getKeyData')
const getKeysController = require('../controllers/getKeys')
const updateOrCreateKeyDataController = require('../controllers/updateOrCreateKeyData')

router.get('/key/:key', async (req, res) => {
  try {
    const { status, data } = await getKeyDataController(req.params.key)
    return sendResponse({ data, res, status })
  } catch (err) {
    return handleUnexpectedError(res, err)
  }
})

router.get('/keys', async (req, res) => {
  try {
    const { status, data } = await getKeysController()
    return sendResponse({ data, res, status })
  } catch (err) {
    return handleUnexpectedError(res, err)
  }
})

router.put('/key/:key', async (req, res) => {
  try {
    const keyValue = req.body?.value
    if (!keyValue) {
      return sendResponse({
        res,
        status: 400,
        data: 'missing key value on body.value request property'
      })
    }
    if (typeof keyValue !== 'string') {
      return sendResponse({
        res,
        status: 400,
        data: 'key value must be a string'
      })
    }

    const { status, data } = await updateOrCreateKeyDataController(
      req.params.key, keyValue
    )
    return sendResponse({ data, res, status })
  } catch (err) {
    return handleUnexpectedError(res, err)
  }
})

handleUnexpectedError = (res, error) => {
  return sendResponse({
    status: 500,
    res,
    data: `Unexpected error: ${error}`
  })
}

sendResponse = ({ res, status = 200, data }) => {
  return res.status(status).json(data).end()
}

module.exports = router
