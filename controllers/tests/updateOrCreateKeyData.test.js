const mockCreateOrUpdateDocument = jest.fn()

jest.mock('../../infrastructure/cacheRepository', () => ({
  createOrUpdateDocument: mockCreateOrUpdateDocument
}))

const mockHandleCacheLimit = jest.fn()

jest.mock('../../infrastructure/cache-common', () => ({
  handleCacheLimit: mockHandleCacheLimit,
  getTTLEnd: jest.fn()
}))

const handler = require('../updateOrCreateKeyData')

describe('updateOrCreateKeyData controller', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return 201 when new doc is created', async () => {
    mockCreateOrUpdateDocument.mockResolvedValueOnce({ upsertedCount: 1 })

    const response = await handler('key', 'value')
    expect(response.status).toStrictEqual(201)
  })

  it('should return 200 when no doc is created', async () => {
    mockCreateOrUpdateDocument.mockResolvedValueOnce({ upsertedCount: 0 })

    const response = await handler('key', 'value')
    expect(response.status).toStrictEqual(200)
  })

  it('should call cacheCommon.handleCacheLimit() when new doc is created', async () => {
    mockCreateOrUpdateDocument.mockResolvedValueOnce({ upsertedCount: 1 })

    await handler('key', 'value')
    expect(mockHandleCacheLimit).toHaveBeenCalledTimes(1)
  })

  it('should not call cacheCommon.handleCacheLimit() when no new doc is created', async () => {
    mockCreateOrUpdateDocument.mockResolvedValueOnce({ upsertedCount: 0 })

    await handler('key', 'value')
    expect(mockHandleCacheLimit).toHaveBeenCalledTimes(0)
  })
})
