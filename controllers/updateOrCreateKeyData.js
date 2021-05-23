const cacheRepository = require('../infrastructure/cacheRepository')

const handler = async (key, value) => {
  const keyDocument = await cacheRepository.createOrUpdateDocument(
    key, value
  )

  return {
    status: keyDocument.upsertedCount ? 201 :  200,
    data: keyDocument.upsertedCount ? 'created' : 'updated'
  }
}

module.exports = handler
