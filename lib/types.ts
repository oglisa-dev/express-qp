import { ParsedQs } from 'qs';

export type ParsedQp = ParsedQs[keyof ParsedQs];

export type ReparsedQp =
	| Exclude<ParsedQp, ParsedQs | Array<ParsedQs>>
	| number
	| boolean
	| ReparsedQs
	| Array<ReparsedQp>;

export type ReparsedQs = {
	[Property in keyof ParsedQs]: ReparsedQp;
};
