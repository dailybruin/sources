import { Request, Response, NextFunction } from 'express';

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
) {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
}

export function errorHandler(err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
}
