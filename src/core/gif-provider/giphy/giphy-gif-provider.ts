import { GiphyFetch } from '@giphy/js-fetch-api'

import { Gif, IGifProvider, SearchGifOptions } from '..'

export class GiphyGifProvider implements IGifProvider {
  private readonly giphyFetch: GiphyFetch

  public constructor() {
    this.giphyFetch = new GiphyFetch(process.env.GIPHY_API_KEY || '')
  }

  async searchGifs(
    term: string,
    options: SearchGifOptions = { limit: 1, offset: 0, lang: 'pt' }
  ): Promise<Gif[]> {
    throw new Error('Method not implemented.')
  }
}
