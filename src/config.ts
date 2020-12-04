import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

export const APP_PORT = process.env.APP_PORT || 3000
export const GIPHY_API_KEY = process.env.GIPHY_API_KEY as string
export const RECIPE_PUPPY_API_URL = process.env.RECIPE_PUPPY_API_URL as string
