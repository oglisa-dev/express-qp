import { ParsedQs } from 'qs';
import { parseObject } from './object.parser';

export function parseRequestQuery(query: ParsedQs) {
	return parseObject(query);
}