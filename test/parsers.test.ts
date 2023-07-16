import { parseNumber } from '../src/parsers/number.parser';
import { parseArray } from '../src/parsers/array.parser';
import { parseBoolean } from '../src/parsers/boolean.parser';
import { parseValue } from '../src/parsers/value.parser';
import { parseObject } from '../src/parsers/object.parser';

jest.mock('../src/parsers/value.parser', () => {
	const originalModule = jest.requireActual('../src/parsers/value.parser');
	return {
		__esModule: true,
		...originalModule,
		parseValue: jest.fn((value: any) => originalModule.parseValue(value))
	};
})

describe('parsers', () => {
	describe('parseNumber', function () {
		test('when called with string representing integer returns parsed number', () => {
			const value = '5';
			const parsed = parseNumber(value);
			expect(parsed).toBe(5);
		});

		test('when called with string representing double returns parsed number', () => {
			const value = '5.12';
			const parsed = parseNumber(value);
			expect(parsed).toBe(5.12);
		});

		test('when called with string representing double with trailing zeros returns parsed number without trailing zeros', () => {
			const value = '5.00';
			const parsed = parseNumber(value);
			expect(parsed).toBe(5);
		});

		test('when called with string representing double returns parsed number', () => {
			const value = '15.0000001';
			const parsed = parseNumber(value);
			expect(parsed).toBe(15.0000001);
		});

		test('when called with string representing integer with leading zeros returns parsed number without leading zeros', () => {
			const value = '0015.2';
			const parsed = parseNumber(value);
			expect(parsed).toBe(15.2);
		});

		test('when called with string "0" returns number 0', () => {
			const value = '0';
			const parsed = parseNumber(value);
			expect(parsed).toBe(0);
		});

		test('when called with string "0.000" returns number 0', () => {
			const value = '0.000';
			const parsed = parseNumber(value);
			expect(parsed).toBe(0);
		});

		test('when called with string "000.000" returns number 0', () => {
			const value = '000.000';
			const parsed = parseNumber(value);
			expect(parsed).toBe(0);
		});
	});

	describe('parseBoolean', function () {
		test('when called with string "true" returns true', () => {
			const value = 'true';
			const parsed = parseBoolean(value);
			expect(parsed).toBe(true);
		});

		test('when called with string "false" returns false', () => {
			const value = 'false';
			const parsed = parseBoolean(value);
			expect(parsed).toBe(false);
		});
	});

	describe('parseArray', function () {
		test('when called with empty array returns empty array', () => {
			const arr: Array<string> = [];
			const parsed = parseArray(arr);
			expect(parsed).toEqual(arr);
		});

		test('calls parseValue for every element of array', () => {
			const arr: Array<string> = ['test1', 'test2', 'test3'];
			parseArray(arr);
			expect(parseValue).toHaveBeenCalledTimes(arr.length);
		});

		test('calls parseValue for every element of array with that element as parameter', () => {
			const arr: Array<string> = ['test1', 'test2', 'test3'];
			expect.assertions(arr.length);
			parseArray(arr);
			arr.forEach((parameter, index) => {
				expect(parseValue).toHaveBeenNthCalledWith(index + 1, parameter);
			});
		});
	});

	describe('parseValue', function () {
		test('when called with "true" returns true', () => {
			const value = 'true';
			const parsed = parseValue(value);
			expect(parsed).toBe(true);
		});

		test('when called with "false" returns false', () => {
			const value = 'false';
			const parsed = parseValue(value);
			expect(parsed).toBe(false);
		});

		test('when called with string representing integers returns number', () => {
			const value = '5';
			const parsed = parseValue(value);
			expect(parsed).toBe(5);
		});

		test('when called with string representing double returns number', () => {
			const value = '5.12';
			const parsed = parseValue(value);
			expect(parsed).toBe(5.12);
		});

		test('when called with undefined returns undefined', () => {
			const value = undefined;
			const parsed = parseValue(value);
			expect(parsed).toBe(undefined);
		});

		test('when called with non parsable string returns same string', () => {
			const value = 'test';
			const parsed = parseValue(value);
			expect(parsed).toBe(value);
		});
	});

	describe('parseObject', function () {
		test('when called with empty object returns empty object', () => {
			const value = {};
			const parsed = parseObject(value);
			expect(parsed).toEqual(value);
		});

		test('when called with object with properties parses value of each property', () => {
			const value = { property1: 'test1', property2: 'test2', property3: [] };
			const keys = Object.keys(value);
			expect.assertions(keys.length);
			const parsed = parseObject(value);
			keys.forEach((key) => {
				expect(parsed[key]).toEqual(parseValue(value[key as keyof typeof value]));
			});
		});
	});
});
