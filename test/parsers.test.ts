import { parseArray, parseBoolean, parseNumber, parseObject, parseValue } from '../src/parsers';

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

		test('when called array of strings (no parsable strings) returns same array', () => {
			const arr = ['test', 'test'];
			const parsed = parseArray(arr);
			expect(parsed).toEqual(arr);
		});

		test('when called array of strings (with parsable numbers) returns array with parsed numbers', () => {
			const arr = ['test', '1', '2.34', 'test'];
			const expected = ['test', 1, 2.34, 'test'];
			const parsed = parseArray(arr);
			expect(parsed).toEqual(expected);
		});

		test('when called array of strings (with parsable booleans) returns array with parsed booleans', () => {
			const arr = ['test', 'true', 'false', 'test'];
			const expected = ['test', true, false, 'test'];
			const parsed = parseArray(arr);
			expect(parsed).toEqual(expected);
		});

		test('when called with array whose elements that are objects have no parsable properties returns same array', () => {
			const arr = ['test', { property: 'a' }, 'test'];
			const expected = ['test', { property: 'a' }, 'test'];
			const parsed = parseArray(arr);
			expect(parsed).toEqual(expected);
		});

		test('when called with array whose elements that are objects have parsable properties returns array with recursively parsed objects', () => {
			const arr = ['test', { property1: '5', property2: '5.12', property3: 'false' }, 'test'];
			const expected = ['test', { property1: 5, property2: 5.12, property3: false }, 'test'];
			const parsed = parseArray(arr);
			expect(parsed).toEqual(expected);
		});

		test('when called with array whose elements that are objects having parsable array properties returns array with recursively parsed objects', () => {
			const arr = ['test', { property: ['test', '5.12', '5', 'false', 'test'] }, 'test'];
			const expected = ['test', { property: ['test', 5.12, 5, false, 'test'] }, 'test'];
			const parsed = parseArray(arr);
			expect(parsed).toEqual(expected);
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
