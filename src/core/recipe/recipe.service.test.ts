import faker from 'faker'

import { Gif, IGifProvider, SearchGifOptions } from '../gif-provider'
import { IRecipeApiProvider } from '../recipe-api-provider'
import { Recipe } from '.'
import { RecipeService } from './recipe.service'

class MockGifProvider implements IGifProvider {
  searchGifs(_term: string, _options?: SearchGifOptions): Promise<Gif[]> {
    throw new Error('Method not implemented.')
  }
}

class MockRecipeApiProvider implements IRecipeApiProvider {
  findRecipesByIngredients(_ingredients: string[]): Promise<Recipe[]> {
    throw new Error('Method not implemented.')
  }
}

describe('RecipeService - searchRecipesByIngredients', () => {
  const mockGifProvider = new MockGifProvider()
  const mockRecipeApiProvider = new MockRecipeApiProvider()

  const recipeService = new RecipeService(
    mockGifProvider,
    mockRecipeApiProvider
  )

  const mockedRecipes: Recipe[] = [
    {
      ingredients: ['onion', 'pepper'],
      link: faker.internet.url(),
      title: faker.commerce.product(),
    },
    {
      ingredients: ['garlic', 'salt'],
      link: faker.internet.url(),
      title: faker.commerce.product(),
    },
  ]

  const mockedGifs = [
    {
      title: faker.commerce.productAdjective(),
      url: faker.internet.url(),
    },
  ]

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call gif provider passing the title as search term', async () => {
    jest
      .spyOn(mockRecipeApiProvider, 'findRecipesByIngredients')
      .mockResolvedValue(mockedRecipes)

    const searchGifsSpy = jest
      .spyOn(mockGifProvider, 'searchGifs')
      .mockResolvedValue([])

    const result = await recipeService.searchRecipesByIngredients({
      ingredients: ['onion', 'garlic'],
    })

    expect(searchGifsSpy).toHaveBeenCalledTimes(2)
    for (let i = 0; i < 2; i++) {
      const term = searchGifsSpy.mock.calls[i][0]
      expect(term).toEqual(mockedRecipes[i].title)
    }

    expect(result).not.toBeNull()
    expect(result.keywords).toEqual(['onion', 'garlic'])
    expect(result.recipes).toHaveLength(2)
  })

  it('should call api to retrieve ingredients and populate returned recipes with gifs', async () => {
    const findRecipesByIngredientsSpy = jest
      .spyOn(mockRecipeApiProvider, 'findRecipesByIngredients')
      .mockResolvedValue(mockedRecipes)

    const searchGifsSpy = jest
      .spyOn(mockGifProvider, 'searchGifs')
      .mockResolvedValue(mockedGifs)

    const result = await recipeService.searchRecipesByIngredients({
      ingredients: ['onion', 'garlic'],
    })

    expect(findRecipesByIngredientsSpy).toHaveBeenCalledTimes(1)
    expect(searchGifsSpy).toHaveBeenCalledTimes(2)

    expect(result).not.toBeNull()
    expect(result.keywords).toEqual(['onion', 'garlic'])
    expect(result.recipes).toHaveLength(2)

    for (let i = 0; i < mockedRecipes.length; i++) {
      expect(result.recipes[i].title).toEqual(mockedRecipes[i].title)
      expect(result.recipes[i].ingredients).toEqual(
        mockedRecipes[i].ingredients
      )
      expect(result.recipes[i].gif).toEqual(mockedGifs[0].url)
    }
  })

  it('should return undefined url if no gif is found for recipe', async () => {
    const findRecipesByIngredientsSpy = jest
      .spyOn(mockRecipeApiProvider, 'findRecipesByIngredients')
      .mockResolvedValue(mockedRecipes)

    const searchGifsSpy = jest
      .spyOn(mockGifProvider, 'searchGifs')
      .mockResolvedValue([])

    const result = await recipeService.searchRecipesByIngredients({
      ingredients: ['onion', 'garlic'],
    })

    expect(findRecipesByIngredientsSpy).toHaveBeenCalledTimes(1)
    expect(searchGifsSpy).toHaveBeenCalledTimes(2)

    expect(result).not.toBeNull()
    expect(result.keywords).toEqual(['onion', 'garlic'])
    expect(result.recipes).toHaveLength(2)

    for (let i = 0; i < mockedRecipes.length; i++) {
      expect(result.recipes[i].title).toEqual(mockedRecipes[i].title)
      expect(result.recipes[i].ingredients).toEqual(
        mockedRecipes[i].ingredients
      )
      expect(result.recipes[i].gif).toEqual(undefined)
    }
  })
})
