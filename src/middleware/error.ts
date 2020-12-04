import { NextFunction, Request, RequestHandler, Response } from 'express'

export const handleGenericErrors = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(500).json({ message: error.message || 'Internal server error' })
}

export const forwardError = (controller: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Promise.resolve(controller(req, res, next))
  } catch (error) {
    next(error)
  }
}
