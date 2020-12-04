export interface RecipePuppyRecipe {
  title: string
  href: string
  ingredients: string
  thumbnail: string
}

export interface RecipePuppyResponse {
  results: RecipePuppyRecipe[]
}
