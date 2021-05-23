const express = require('express')
const router = express.Router()
const getOrCreateKeyDataController = require('../controllers/getOrCreateKeyData')
const getKeysController = require('../controllers/getKeys')
const updateOrCreateKeyDataController = require('../controllers/updateOrCreateKeyData')
const deleteKeyDataController = require('../controllers/deleteKeyData')
const deleteKeysController = require('../controllers/deleteKeys')

router.get('/key/:key', async (req, res) => {
  try {
    const { status, data } = await getOrCreateKeyDataController(req.params.key)
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

router.delete('/key/:key', async (req, res) => {
  try {
    const { status, data } = await deleteKeyDataController(req.params.key)
    return sendResponse({ data, res, status })
  } catch (err) {
    return handleUnexpectedError(res, err)
  }
})

router.delete('/keys', async (req, res) => {
  try {
    const { status, data } = await deleteKeysController()
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
