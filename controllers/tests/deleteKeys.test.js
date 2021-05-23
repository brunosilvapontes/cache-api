const mockDeleteAllKeys = jest.fn()

jest.mock('../../infrastructure/cacheRepository', () => ({
  deleteAllKeys: mockDeleteAllKeys
}))

const handler = require('../deleteKeys')

describe('deleteKeys controller', () => {
  it('should call deleteAllKeys repository method once', async () => {
    await handler()
    expect(mockDeleteAllKeys).toHaveBeenCalledTimes(1)
  })

  it('should return 200', async () => {
    const response = await handler()
    expect(response.status).toStrictEqual(200)
  })
})