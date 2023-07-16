import { ParsedQp, ReparsedQp } from '../types';
import { isArray, isBoolean, isNumber, isObject } from '../assertions';
import { parseBoolean } from './boolean.parser';
import { parseArray } from './array.parser';
import { parseNumber } from './number.parser';
import { parseObject } from './object.parser';

export function parseValue(value: ParsedQp): ReparsedQp {
	if (typeof value === 'undefined') {
		return undefined;
	}

	if (isBoolean(value)) return parseBoolean(value);

	if (isNumber(value)) return parseNumber(value);

	if (isArray(value)) return parseArray(value);

	if (isObject(value)) return parseObject(value);

	return value;
}