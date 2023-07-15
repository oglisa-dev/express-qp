import { ReparsedQs } from './types';

declare namespace Express {
	export interface Request {
		query: ReparsedQs 
	}
}