const mockDeleteKey = jest.fn()

jest.mock('../../infrastructure/cacheRepository', () => ({
  deleteKeyDocument: mockDeleteKey
}))

const handler = require('../deleteKeyData')

describe('deleteKeyData controller', () => {
  it('should return 404 when no document was indeed deleted', async () => {
    mockDeleteKey.mockResolvedValueOnce({ deletedCount: 0 })
    const response = await handler('key')
    expect(response.status).toStrictEqual(404)
  })

  it('should return 200 when a document was deleted', async () => {
    mockDeleteKey.mockResolvedValueOnce({ deletedCount: 1 })
    const response = await handler('key')
    expect(response.status).toStrictEqual(200)
  })
})