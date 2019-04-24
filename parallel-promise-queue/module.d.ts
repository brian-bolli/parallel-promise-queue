export as namespace ppq;

export function execute (
	items: Array<any>,
	promise: Promise<any>,
	concurrency: number,
	sequential: Boolean
): Array<any>
