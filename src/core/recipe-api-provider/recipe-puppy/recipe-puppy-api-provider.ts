import axios from 'axios'

import { RECIPE_PUPPY_API_URL } from '../../../config'
import {
  commaDelimitedStringToStringArray,
  stringArrayToCommaDelimitedString,
} from '../../../helper/string-helper'
import { Recipe } from '../../recipe'
import { IRecipeApiProvider } from '..'
import { RecipePuppyResponse } from '.'

export class RecipePuppyApiProvider implements IRecipeApiProvider {
  public async findRecipesByIngredients(
    ingredients: string[]
  ): Promise<Recipe[]> {
    const ingredientsAsString = stringArrayToCommaDelimitedString(ingredients)
    const response = await axios(RECIPE_PUPPY_API_URL, {
      params: { i: ingredientsAsString },
    })
    const data = response.data as RecipePuppyResponse
    return data.results.map((recipe) => ({
      ingredients: commaDelimitedStringToStringArray(recipe.ingredients).sort(),
      link: recipe.href,
      title: recipe.title,
    }))
  }
}
