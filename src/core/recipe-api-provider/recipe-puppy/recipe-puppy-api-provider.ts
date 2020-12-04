import { Recipe } from '../../recipe'
import { IRecipeApiProvider } from '..'

export class RecipePuppyApiProvider implements IRecipeApiProvider {
  public async findRecipesByIngredients(
    ingredients: string[]
  ): Promise<Recipe[]> {
    throw new Error('Method not implemented.')
  }
}
