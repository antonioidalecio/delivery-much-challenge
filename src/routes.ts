import { Router } from 'express'

import recipeRoutes from './core/recipe/recipe.routes'

const router = Router()

router.use(recipeRoutes)

export default router
