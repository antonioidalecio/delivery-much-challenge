import request from 'supertest'

import { MAX_ALLOWED_INGREDIENTS } from '../../constant/validations'
import server from '../../server'
import { SearchRecipeResponse } from '.'

let searchRecipesByIngredients: jest.Mock<SearchRecipeResponse>

jest.mock('./recipe.service', () => {
  return {
    RecipeService: jest.fn().mockImplementation(() => {
      searchRecipesByIngredients = jest.fn()
      return {
        searchRecipesByIngredients,
      }
    }),
  }
})

describe('RecipeController - searchRecipes', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it(`should validate if more than ${MAX_ALLOWED_INGREDIENTS} ingredients are provided`, async () => {
    const response = await request(server)
      .get('/recipes')
      .query({ i: 'onion,garlic,pepper,tomato' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })

  it('should parse comma separated ingredients before calling service', async () => {
    searchRecipesByIngredients.mockReturnValue({
      keywords: [],
      recipes: [],
    })
    const response = await request(server)
      .get('/recipes')
      .query({ i: 'onion,garlic,pepper' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('keywords')
    expect(response.body).toHaveProperty('recipes')
    expect(searchRecipesByIngredients).toHaveBeenCalledTimes(1)
    expect(searchRecipesByIngredients).toHaveBeenCalledWith({
      ingredients: ['onion', 'garlic', 'pepper'],
    })
  })

  it('should return 500 with error message if any exception is thrown', async () => {
    searchRecipesByIngredients.mockImplementation(() => {
      throw new Error('Unexpected error')
    })
    const response = await request(server)
      .get('/recipes')
      .query({ i: 'onion,garlic,pepper' })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'Unexpected error')
  })

  it('should return 500 with default error message "Internal server error" if an exception without message is thrown', async () => {
    searchRecipesByIngredients.mockImplementation(() => {
      throw new Error()
    })
    const response = await request(server)
      .get('/recipes')
      .query({ i: 'onion,garlic,pepper' })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'Internal server error')
  })
})
