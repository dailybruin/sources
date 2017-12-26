import { Request, Response, NextFunction } from 'express';

interface ExpressError extends Error {
  status: number;
  message: string;
}

/**
 * Adds a status of '404' onto an Error
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const err: ExpressError = new Error('Not Found') as ExpressError;
  err.status = 404;
  next(err);
}

export function errorHandler(
  err: ExpressError,
  req: Request,
  res: Response
): void {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
}
