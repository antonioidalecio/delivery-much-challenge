import { Request, Response } from 'express'

import { commaDelimitedStringToStringArray } from '../../helper/string-helper'
import { RecipeService } from './recipe.service'

export class RecipeController {
  public constructor(private readonly recipeService: RecipeService) {}

  public async searchRecipes(req: Request, res: Response): Promise<void> {
    const ingredients = commaDelimitedStringToStringArray(req.query.i as string)
    const recipes = await this.recipeService.searchRecipesByIngredients({
      ingredients,
    })
    res.json(recipes).status(200)
  }
}
