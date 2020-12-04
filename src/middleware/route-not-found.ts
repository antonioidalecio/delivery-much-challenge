import { Request, Response } from 'express'

export const routeNotFound = (_req: Request, res: Response): void => {
  res.status(404).json({ message: 'Endpoint not found' })
}
