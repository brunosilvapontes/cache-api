const cacheRepository = require('./cacheRepository')

const cacheCommon = {
  /**
   * 
   * It deletes the older documents in order to not exceed the CACHE_KEYS_LIMIT.
   * To do that, the code verifies the date type property createdOrUpdatedAt, that is
   * updated on every cache insert or update.
   */
  handleCacheLimit: async () => {
    const countKeys = await cacheRepository.countKeys()

    const keysAboveLimit = countKeys - Number(process.env.CACHE_KEYS_LIMIT)

    if (keysAboveLimit <= 0) return

    const oldestKeys = await cacheRepository.getOldestKeyIds(keysAboveLimit)
    
    await cacheRepository.deleteByIds(oldestKeys.map(keyDoc => keyDoc._id))
  }
}

module.exports = cacheCommon
