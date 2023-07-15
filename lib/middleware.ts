import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { parseObject } from './parsers';

export function qp(request: Request, response: Response, next: NextFunction) {
	request.query = parseObject(request.query) as ParsedQs;
	next();
}
