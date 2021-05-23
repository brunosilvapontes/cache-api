const mongoUtil = require('./mongo-util')

const getCollection = () => mongoUtil.getDb().collection('cache')

const cacheMongoRepository = {
  getKeyDocument: async key => await getCollection().findOne({ key }),
  insertDocument: async doc => await getCollection().insertOne(doc),
  getKeys: async () => await getCollection().find(
    {},
    { projection : { key: true } }
  ).toArray()
}

module.exports = cacheMongoRepository
