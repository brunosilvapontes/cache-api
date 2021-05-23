const cacheRepository = require('../infrastructure/cacheRepository')

const handler = async key => {
  const keyDocument = await cacheRepository.getKeyDocument(key)

  if (keyDocument) {
    console.log('Cache hit')
    return { status: 200, data: keyDocument.value }
  }

  console.log('Cache miss')
  const randomString = Math.random().toString(36).substring(7)
  await cacheRepository.insertDocument({key, value: randomString })
  return { status: 201, data: randomString }
}

module.exports = handler
