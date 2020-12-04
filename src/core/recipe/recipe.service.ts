import { IGifProvider } from '../gif-provider'
import { IRecipeApiProvider } from '../recipe-api-provider'
import { SearchRecipeRequest, SearchRecipeResponse } from '.'

export class RecipeService {
  public constructor(
    private readonly gifProvider: IGifProvider,
    private readonly recipeApiProvider: IRecipeApiProvider
  ) {}

  public async searchRecipesByIngredients(
    searchRequest: SearchRecipeRequest
  ): Promise<SearchRecipeResponse> {
    throw new Error('Method not implemented.')
  }
}
