import { NextFunction, Request, Response } from 'express';
import { parseRequestQuery } from './parsers';

export function qp(request: Request, response: Response, next: NextFunction) {
	request.query = parseRequestQuery(request.query);
	next();
}
