import { ParsedQs } from 'qs';
import { ParsedQp, ReparsedQp, ReparsedQs } from './types';
import { isArray, isBoolean, isNumber, isObject } from './assertions';

export function parseObject(query: ParsedQs) {
	const result: ReparsedQs = {};

	for (const [key, value] of Object.entries(query)) {
		const parsedValue = parseValue(value);
		if (parsedValue !== undefined) {
			result[key] = parsedValue;
		}
	}

	return result;
}

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

export function parseArray(arr: Array<string | ParsedQs>): Array<ReparsedQp> {
	const result: Array<ReparsedQp> = [];

	for (let i = 0; i < arr.length; i++) {
		result[i] = parseValue(arr[i]);
	}

	return result;
}

export function parseNumber(value: string) {
	return Number(value);
}

export function parseBoolean(value: string) {
	return value === 'true';
}
