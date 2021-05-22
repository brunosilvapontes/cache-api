const { MongoClient } = require('mongodb')
let db

module.exports = {
  connect: async (mongoUri, mongoDatabase, connectOptions) => {
    const client = new MongoClient(mongoUri, connectOptions)
    const connection = await client.connect()
    db = connection.db(mongoDatabase)
  },
  getDb: () => db
}
