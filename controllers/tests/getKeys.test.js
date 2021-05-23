const returnedKeyMock = 'key'

const mockGetKeys = jest.fn().mockResolvedValue([
  { key: returnedKeyMock }
])

jest.mock('../../infrastructure/cacheRepository', () => ({
  getKeys: mockGetKeys
}))

const handler = require('../getKeys')

describe('getKeys controller', () => {
  it('should call getKeys repository method once', async () => {
    await handler()
    expect(mockGetKeys).toHaveBeenCalledTimes(1)
  })

  it('should return 200', async () => {
    const response = await handler()
    expect(response.status).toStrictEqual(200)
  })

  it('should return array of keys', async () => {
    const response = await handler()
    expect(response.data).toStrictEqual([returnedKeyMock])
  })
})
