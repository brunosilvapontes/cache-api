const mongoUtil = require('./mongo-util')

const getCollection = () => mongoUtil.getDb().collection('cache')

const cacheMongoRepository = {
  getKeyDocument: async key => await getCollection().findOne({ key }),

  insertDocument: async doc => await getCollection().insertOne(
    { ...doc, createdOrUpdatedAt: new Date() }
  ),

  getKeys: async () => await getCollection().find(
    {},
    { projection : { key: true } }
  ).toArray(),

  createOrUpdateDocument: async (key, value) => await getCollection()
    .updateOne(
      { key },
      { $set: { key, value, createdOrUpdatedAt: new Date() } },
      { upsert: true }
    ),

  deleteKeyDocument: async key => await getCollection().deleteOne({ key }),

  deleteAllKeys: async () => await getCollection().deleteMany({}),

  countKeys: async () => await getCollection().find().count(),

  getOldestKeyIds: async limit => await getCollection()
    .find({}, { projection: { _id: true } })
    .sort({ createdOrUpdatedAt: 1 })
    .limit(limit)
    .toArray(),
  
  deleteByIds: async ids => await getCollection()
    .deleteMany({ _id: { $in: ids } })
}

module.exports = cacheMongoRepository
