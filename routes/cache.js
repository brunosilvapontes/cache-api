const express = require('express')
const router = express.Router()

router.get('/key/:key', async (req, res) => {
  try {
    return sendResponse({ data: 'success', res })
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
