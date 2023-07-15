import { ParsedQs } from 'qs';
import { isArray, isBoolean, isNumber, isObject } from '../src/assertions';

describe('assertions', () => {
	describe('isNumber()', function () {
		test('when called with string representing integer returns true', () => {
			const value = '5';
			const result = isNumber(value);
			expect(result).toBe(true);
		});

		test('when called with string representing double returns true', () => {
			const value = '5.12';
			const result = isNumber(value);
			expect(result).toBe(true);
		});

		test('when called with string representing double (multiple decimals) returns true', () => {
			const value = '5.12123001293180';
			const result = isNumber(value);
			expect(result).toBe(true);
		});

		test('when called with string not representing number returns false', () => {
			const value = 'test';
			const result = isNumber(value);
			expect(result).toBe(false);
		});

		test('when called with empty array returns false', () => {
			const value: Array<string> = [];
			const result = isNumber(value);
			expect(result).toBe(false);
		});

		test('when called with string "true" returns false', () => {
			const value = 'true';
			const result = isNumber(value);
			expect(result).toBe(false);
		});

		test('when called with string "false" returns false', () => {
			const value = 'false';
			const result = isNumber(value);
			expect(result).toBe(false);
		});

		test('when called with array of strings returns false', () => {
			const value: Array<string> = ['1', '2', '3'];
			const result = isNumber(value);
			expect(result).toBe(false);
		});

		test('when called with undefined returns false', () => {
			const value = undefined;
			const result = isNumber(value);
			expect(result).toBe(false);
		});

		test('when called with array of objects returns false', () => {
			const value = [{}, { property: 'asd' }];
			const result = isNumber(value);
			expect(result).toBe(false);
		});

		test('when called with an object returns false', () => {
			const value = { property: 'asd' };
			const result = isNumber(value);
			expect(result).toBe(false);
		});
	});

	describe('isBoolean()', function () {
		test('when called with string "true" returns true', () => {
			const value = 'true';
			const result = isBoolean(value);
			expect(result).toBe(true);
		});

		test('when called with string "false" returns true', () => {
			const value = 'false';
			const result = isBoolean(value);
			expect(result).toBe(true);
		});

		test('when called with string representing integer returns false', () => {
			const value = '5';
			const result = isBoolean(value);
			expect(result).toBe(false);
		});

		test('when called with string representing double returns false', () => {
			const value = '5.12';
			const result = isBoolean(value);
			expect(result).toBe(false);
		});

		test('when called with string not representing number returns false', () => {
			const value = 'test';
			const result = isBoolean(value);
			expect(result).toBe(false);
		});

		test('when called with empty array returns false', () => {
			const value: Array<string> = [];
			const result = isBoolean(value);
			expect(result).toBe(false);
		});

		test('when called with array of strings returns false', () => {
			const value: Array<string> = ['1', '2', '3'];
			const result = isBoolean(value);
			expect(result).toBe(false);
		});

		test('when called with undefined returns false', () => {
			const value = undefined;
			const result = isBoolean(value);
			expect(result).toBe(false);
		});

		test('when called with array of objects returns false', () => {
			const value = [{}, { property: 'asd' }];
			const result = isBoolean(value);
			expect(result).toBe(false);
		});

		test('when called with an object returns false', () => {
			const value = { property: 'asd' };
			const result = isBoolean(value);
			expect(result).toBe(false);
		});
	});

	describe('isObject()', function () {
		test('when called with an empty object returns true', () => {
			const value = {};
			const result = isObject(value);
			expect(result).toBe(true);
		});

		test('when called with an object literal returns true', () => {
			const value = { property: 'asd' };
			const result = isObject(value);
			expect(result).toBe(true);
		});

		test('when called with an object created via Object constructor returns true', () => {
			const value = new Object() as ParsedQs;
			const result = isObject(value);
			expect(result).toBe(true);
		});

		test('when called with string representing integer returns false', () => {
			const value = '5';
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with string representing double returns false', () => {
			const value = '5.12';
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with empty array returns false', () => {
			const value: Array<string> = [];
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with array of strings returns false', () => {
			const value: Array<string> = ['1', '2', '3'];
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with string "true" returns false', () => {
			const value = 'true';
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with string "false" returns false', () => {
			const value = 'false';
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with undefined returns false', () => {
			const value = undefined;
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with array of objects returns false', () => {
			const value = [{}, { property: 'asd' }];
			const result = isObject(value);
			expect(result).toBe(false);
		});
	});

	describe('isArray()', function () {
		test('when called with empty array returns true', () => {
			const value: Array<string> = [];
			const result = isArray(value);
			expect(result).toBe(true);
		});

		test('when called with array of strings returns true', () => {
			const value: Array<string> = ['some', 'prop', 'test', '1'];
			const result = isArray(value);
			expect(result).toBe(true);
		});

		test('when called with array of objects returns true', () => {
			const value = [{}, { property: 'asd' }];
			const result = isArray(value);
			expect(result).toBe(true);
		});

		test('when called with array create via Array constructor returns true', () => {
			const value = new Array();
			const result = isArray(value);
			expect(result).toBe(true);
		});

		test('when called with an empty object returns false', () => {
			const value = {};
			const result = isArray(value);
			expect(result).toBe(false);
		});

		test('when called with an object literal returns false', () => {
			const value = { property: 'asd' };
			const result = isArray(value);
			expect(result).toBe(false);
		});

		test('when called with an object created via Object constructor returns false', () => {
			const value = new Object() as ParsedQs;
			const result = isArray(value);
			expect(result).toBe(false);
		});

		test('when called with string "true" returns false', () => {
			const value = 'true';
			const result = isArray(value);
			expect(result).toBe(false);
		});

		test('when called with string "false" returns false', () => {
			const value = 'false';
			const result = isArray(value);
			expect(result).toBe(false);
		});

		test('when called with undefined returns false', () => {
			const value = undefined;
			const result = isArray(value);
			expect(result).toBe(false);
		});

		test('when called with string representing integer returns false', () => {
			const value = '5';
			const result = isObject(value);
			expect(result).toBe(false);
		});

		test('when called with string representing double returns false', () => {
			const value = '5.12';
			const result = isObject(value);
			expect(result).toBe(false);
		});
	});
});
