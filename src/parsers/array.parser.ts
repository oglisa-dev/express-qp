import { ParsedQs } from 'qs';
import { ReparsedQp } from '../types';
import { parseValue } from './value.parser';

export function parseArray(arr: Array<string | ParsedQs>): Array<ReparsedQp> {
	const result: Array<ReparsedQp> = [];

	for (let i = 0; i < arr.length; i++) {
		result[i] = parseValue(arr[i]);
	}

	return result;
}