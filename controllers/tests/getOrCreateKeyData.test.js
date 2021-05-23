const mockGetKeyDocument = jest.fn()
const mockResetTTLById = jest.fn()
const mockCreateOrUpdateDocument = jest.fn()
const mockInsertDocument = jest.fn()

jest.mock('../../infrastructure/cacheRepository', () => ({
  getKeyDocument: mockGetKeyDocument,
  resetTTLById: mockResetTTLById,
  createOrUpdateDocument: mockCreateOrUpdateDocument,
  insertDocument: mockInsertDocument
}))

jest.mock('../../infrastructure/cache-common', () => ({
  handleCacheLimit: jest.fn(),
  getTTLEnd: jest.fn()
}))

const handler = require('../getOrCreateKeyData')

describe('getOrCreateKeyData controller', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should return 200 when key is found', async () => {
    mockGetKeyDocument.mockResolvedValueOnce({})

    const response = await handler('key')
    expect(response.status).toStrictEqual(200)
  })

  it('should call resetTTLById when TTL is still valid', async () => {
    mockGetKeyDocument.mockResolvedValueOnce({ ttlEnd: new Date(3000, 1, 1) })

    await handler('key')
    expect(mockResetTTLById).toHaveBeenCalledTimes(1)
  })

  it('should return a new cache value when TTL is not valid', async () => {
    mockGetKeyDocument.mockResolvedValueOnce({
      ttlEnd: new Date(2000, 1, 1),
      value: 'a'
    })

    const response = await handler('key')
    expect(response.data).not.toStrictEqual('a')
  })

  it('should return 201 when key is not found', async () => {
    mockGetKeyDocument.mockResolvedValueOnce(null)

    const response = await handler('key')
    expect(response.status).toStrictEqual(201)
  })

  it('should call insertDocument repository method when key is not found', async () => {
    mockGetKeyDocument.mockResolvedValueOnce(null)

    const response = await handler('key')
    expect(mockInsertDocument).toHaveBeenCalledTimes(1)
  })
})
