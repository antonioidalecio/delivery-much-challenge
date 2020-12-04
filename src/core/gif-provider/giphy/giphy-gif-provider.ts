import { GiphyFetch } from '@giphy/js-fetch-api'

import { GIPHY_API_KEY } from '../../../config'
import { Gif, IGifProvider, SearchGifOptions } from '..'

export class GiphyGifProvider implements IGifProvider {
  private readonly giphyFetch: GiphyFetch

  public constructor() {
    this.giphyFetch = new GiphyFetch(GIPHY_API_KEY)
  }

  async searchGifs(
    term: string,
    options: SearchGifOptions = { limit: 1, offset: 0, lang: 'pt' }
  ): Promise<Gif[]> {
    const gifs = await this.giphyFetch.search(term, options)
    return gifs.data.map((gif) => ({
      title: gif.title,
      url: gif.url,
    }))
  }
}
