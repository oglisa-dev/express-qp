import { ParsedQp } from './types';
import { ParsedQs } from 'qs';

export function isObject(value: ParsedQp): value is ParsedQs {
    return typeof value === 'object' && value.constructor === Object;
}

export function isNumber(value: ParsedQp): value is string {
    if (typeof value !== 'string') return false;
    const parsed = parseFloat(value);
    return !isNaN(parsed) && isFinite(parsed);
}

export function isBoolean(value: ParsedQp): value is string {
    return value === 'false' || value === 'true';
}

export function isArray(value: ParsedQp): value is Array<any> {
    return Array.isArray(value);
}