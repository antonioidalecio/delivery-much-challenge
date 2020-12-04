export interface Gif {
  title: string
  url: string
}

export interface SearchGifOptions {
  limit?: number
  offset?: number
  lang?: string
}

export interface IGifProvider {
  searchGifs(term: string, options?: SearchGifOptions): Promise<Gif[]>
}
