export interface Recipe {
  title: string
  ingredients: string[]
  link: string
  gif?: string
}

export interface SearchRecipeResponse {
  keywords: string[]
  recipes: Recipe[]
}

export interface SearchRecipeRequest {
  ingredients: string[]
}
