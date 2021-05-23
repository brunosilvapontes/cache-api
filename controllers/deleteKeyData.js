const cacheRepository = require('../infrastructure/cacheRepository')

const handler = async key => {
  const keyDocument = await cacheRepository.deleteKeyDocument(key)

  return {
    status: keyDocument.deletedCount ? 200 : 404,
    data: keyDocument.deletedCount ? 'deleted' : 'key not found'
  }
}

module.exports = handler
