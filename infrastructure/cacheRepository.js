const mongoUtil = require('./mongo-util')

const getCollection = () => mongoUtil.getDb().collection('cache')

const cacheMongoRepository = {
  getKeyDocument: async key => await getCollection().findOne({ key }),
  insertDocument: async doc => await getCollection().insertOne(doc),
  getKeys: async () => await getCollection().find(
    {},
    { projection : { key: true } }
  ).toArray(),
  createOrUpdateDocument: async (key, value) => await getCollection().updateOne(
    { key },
    { $set: { key, value } },
    { upsert: true }
  )
}

module.exports = cacheMongoRepository
