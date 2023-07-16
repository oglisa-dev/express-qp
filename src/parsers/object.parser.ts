import { ParsedQs } from 'qs';
import { ReparsedQs } from '../types';
import { parseValue } from './value.parser';

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