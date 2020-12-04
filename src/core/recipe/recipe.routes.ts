import { Router } from 'express'
import { query } from 'express-validator'

import { MAX_ALLOWED_INGREDIENTS } from '../../constant/validations'
import { commaDelimitedStringToStringArray } from '../../helper/string-helper'
import { forwardError } from '../../middleware/error'
import { validate } from '../../middleware/validation'
import { GiphyGifProvider } from '../gif-provider/giphy/giphy-gif-provider'
import { RecipePuppyApiProvider } from '../recipe-api-provider/recipe-puppy/recipe-puppy-api-provider'
import { RecipeController } from './recipe.controller'
import { RecipeService } from './recipe.service'

const giphyProvider = new GiphyGifProvider()
const recipePuppyProvider = new RecipePuppyApiProvider()
const recipeService = new RecipeService(giphyProvider, recipePuppyProvider)

const recipeController = new RecipeController(recipeService)

const router = Router()

router.get(
  '/recipes',
  validate([
    query('i', `Max allowed ingredients is ${MAX_ALLOWED_INGREDIENTS}`).custom(
      (ingredientsAsString) => {
        const ingredientsArray = commaDelimitedStringToStringArray(
          ingredientsAsString
        )
        return ingredientsArray.length <= MAX_ALLOWED_INGREDIENTS
      }
    ),
  ]),
  forwardError(recipeController.searchRecipes.bind(recipeController))
)

export default router
