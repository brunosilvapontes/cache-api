const cacheRepository = require('../infrastructure/cacheRepository')

const handler = async () => {
  const keyDocuments = await cacheRepository.getKeys()

  return {
    status: 200,
    data: keyDocuments.map(keyDoc => keyDoc.key)
  }
}

module.exports = handler
