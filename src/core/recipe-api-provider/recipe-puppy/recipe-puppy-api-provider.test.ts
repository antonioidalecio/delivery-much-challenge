import faker from 'faker'

import { RecipePuppyRecipe } from '.'
import { RecipePuppyApiProvider } from './recipe-puppy-api-provider'

let axiosMock: jest.Mock

let mockUrl: string

jest.mock('../../../config', () => {
  mockUrl = 'http://recipe.api.mock'
  return {
    RECIPE_PUPPY_API_URL: mockUrl,
  }
})

jest.mock('axios', () => {
  axiosMock = jest.fn()
  return axiosMock
})

describe('RecipePuppyApiProvider - findRecipesByIngredients', () => {
  const recipePuppyApiProvider = new RecipePuppyApiProvider()

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call recipe api passing ingredients as comma separated string', async () => {
    const ingredients = ['onion', 'pepper']

    const mockedResponse: RecipePuppyRecipe[] = [
      {
        title: faker.lorem.word(),
        href: faker.internet.url(),
        ingredients: 'onion,pepper,garlic',
        thumbnail: faker.internet.url(),
      },
      {
        title: faker.lorem.word(),
        href: faker.internet.url(),
        ingredients: 'mint,milk,eggs',
        thumbnail: faker.internet.url(),
      },
    ]

    axiosMock.mockResolvedValue({
      data: {
        results: mockedResponse,
      },
    })

    const recipes = await recipePuppyApiProvider.findRecipesByIngredients(
      ingredients
    )

    expect(recipes).toHaveLength(2)
    expect(axiosMock).toHaveBeenCalledTimes(1)

    const [axiosArguments] = axiosMock.mock.calls

    const [url, params] = axiosArguments

    expect(url).toEqual(mockUrl)
    expect(params).toEqual({ params: { i: 'onion,pepper' } })
  })

  it('should convert comma separted list of ingredients to array and order it in ascending order', async () => {
    const ingredients = ['onion', 'pepper']

    const mockedResponse: RecipePuppyRecipe[] = [
      {
        title: faker.lorem.word(),
        href: faker.internet.url(),
        ingredients: 'onion,pepper,garlic',
        thumbnail: faker.internet.url(),
      },
      {
        title: faker.lorem.word(),
        href: faker.internet.url(),
        ingredients: 'milk,eggs',
        thumbnail: faker.internet.url(),
      },
    ]

    axiosMock.mockResolvedValue({
      data: {
        results: mockedResponse,
      },
    })

    const recipes = await recipePuppyApiProvider.findRecipesByIngredients(
      ingredients
    )

    expect(recipes).toHaveLength(2)
    expect(recipes[0].ingredients).toEqual(['garlic', 'onion', 'pepper'])
    expect(recipes[1].ingredients).toEqual(['eggs', 'milk'])
  })
})
