const cacheRepository = require('../infrastructure/cacheRepository')
const cacheCommon = require('../infrastructure/cache-common')

const handler = async key => {
  const keyDocument = await cacheRepository.getKeyDocument(key)

  const now = new Date()
  const ttlEnd = cacheCommon.getTTLEnd()
  const randomString = Math.random().toString(36).substring(7)

  if (keyDocument) {
    if (keyDocument.ttlEnd && now <= keyDocument.ttlEnd) {
      console.log('Cache hit')
      cacheRepository.resetTTLById(keyDocument._id, ttlEnd)
      return { status: 200, data: keyDocument.value }
    }
    
    console.log('Cache miss')
    await cacheRepository.createOrUpdateDocument(key, randomString, ttlEnd)
    return { status: 200, data: randomString }
  }

  console.log('Cache miss')
  await cacheRepository.insertDocument({
    key,
    value: randomString,
    ttlEnd
  })

  cacheCommon.handleCacheLimit()

  return { status: 201, data: randomString }
}

module.exports = handler
