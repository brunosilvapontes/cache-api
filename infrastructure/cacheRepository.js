const mongoUtil = require('./mongo-util')

const getCollection = () => mongoUtil.getDb().collection('cache')

const cacheMongoRepository = {
  getKeyDocument: async key => await getCollection().findOne({ key }),
  insertDocument: async doc => await getCollection().insertOne(doc)
}

module.exports = cacheMongoRepository
