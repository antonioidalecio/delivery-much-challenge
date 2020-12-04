export interface IRecipeApiProvider {
  findRecipesByIngredients(ingredients: string[]): Promise<Recipe[]>
}
