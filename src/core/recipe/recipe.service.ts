import { IGifProvider } from '../gif-provider'
import { IRecipeApiProvider } from '../recipe-api-provider'
import { Recipe, SearchRecipeRequest, SearchRecipeResponse } from '.'

export class RecipeService {
  public constructor(
    private readonly gifProvider: IGifProvider,
    private readonly recipeApiProvider: IRecipeApiProvider
  ) {}

  public async searchRecipesByIngredients(
    searchRequest: SearchRecipeRequest
  ): Promise<SearchRecipeResponse> {
    const recipes = await this.recipeApiProvider.findRecipesByIngredients(
      searchRequest.ingredients
    )

    const recipesResponse: SearchRecipeResponse = {
      keywords: searchRequest.ingredients,
      recipes: await this.fetchAndPopulateRecipesGifs(recipes),
    }

    return recipesResponse
  }

  private async fetchAndPopulateRecipesGifs(
    recipes: Recipe[]
  ): Promise<Recipe[]> {
    const recipesGifs = await Promise.all(
      recipes.map((recipe) => this.gifProvider.searchGifs(recipe.title))
    )
    return recipes.map((recipe, index) => {
      const [firstGif] = recipesGifs[index]
      return {
        ...recipe,
        gif: firstGif?.url,
      }
    })
  }
}
