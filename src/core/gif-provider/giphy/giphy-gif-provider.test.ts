import { GifsResult } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'
import faker from 'faker'

import { GiphyGifProvider } from './giphy-gif-provider'

let searchMock: jest.Mock<Promise<Partial<GifsResult>>>

jest.mock('@giphy/js-fetch-api', () => {
  return {
    GiphyFetch: jest.fn().mockImplementation(() => {
      searchMock = jest.fn()
      return {
        search: searchMock,
      }
    }),
  }
})

describe('GiphyGifProvider - searchGifs', () => {
  const giphyGifProvider = new GiphyGifProvider()

  const gifsData = [
    {
      title: faker.commerce.productAdjective(),
      url: faker.internet.url(),
    } as IGif,
    {
      title: faker.commerce.productAdjective(),
      url: faker.internet.url(),
    } as IGif,
  ]

  const mockedGifs: Partial<GifsResult> = {
    data: gifsData,
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should use giphy sdk to fetch gifs passing the given parameters', async () => {
    const term = 'my gif'
    const options = {
      limit: 1,
      offset: 1,
      lang: 'en',
    }

    searchMock.mockResolvedValue(mockedGifs)

    await giphyGifProvider.searchGifs(term, options)

    expect(searchMock).toBeCalledTimes(1)
    expect(searchMock).toBeCalledWith(term, options)
  })

  it('should parse response correctly', async () => {
    const term = 'my gif'

    searchMock.mockResolvedValue(mockedGifs)

    const gifs = await giphyGifProvider.searchGifs(term)

    expect(searchMock).toBeCalledTimes(1)
    expect(searchMock).toBeCalledWith(term, { limit: 1, offset: 0, lang: 'pt' })

    expect(gifs).toHaveLength(2)

    for (let i = 0; i < 2; i++) {
      expect(gifs[i].title).toEqual(gifsData[i].title)
      expect(gifs[i].url).toEqual(gifsData[i].url)
    }
  })
})
