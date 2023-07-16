declare module 'express-serve-static-core' {
	import { ReparsedQs } from './types';

	interface Request {
		query: ReparsedQs;
	}
}