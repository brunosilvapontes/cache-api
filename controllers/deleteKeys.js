const cacheRepository = require('../infrastructure/cacheRepository')

const handler = async () => {
  await cacheRepository.deleteAllKeys()

  return {
    status: 200,
    data: 'deleted'
  }
}

module.exports = handler
