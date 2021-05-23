const cacheRepository = require('../infrastructure/cacheRepository')
const cacheCommon = require('../infrastructure/cache-common')

const handler = async (key, value) => {
  const keyDocument = await cacheRepository.createOrUpdateDocument(
    key, value, cacheCommon.getTTLEnd()
  )

  const createdNewDoc = !!keyDocument.upsertedCount

  if (createdNewDoc) cacheCommon.handleCacheLimit()

  return {
    status: createdNewDoc ? 201 :  200,
    data: createdNewDoc ? 'created' : 'updated'
  }
}

module.exports = handler
