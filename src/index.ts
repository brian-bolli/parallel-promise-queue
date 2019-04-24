"use strict";

import TaskQueue from './TaskQueue';

export const execute = async (
	items: Array<any>,
	promise: any,
	concurrency: number = 1,
	sequential: Boolean = true
): Promise<any> => {

	if (concurrency <= 0) {
		return Promise.reject(
			new Error("A valid integer must be used for concurrency parameter")
		);
	}

	const length: number = items.length;

	if (length === 0) {
		return Promise.resolve();
	}

	const queue: TaskQueue = new TaskQueue(concurrency);
	const results: Array<any> = [];

	return new Promise(

		(resolve: any, reject: any) => {

			let completed: number = 0;

			for (let i = 0; i < length; i++) {

				let item = items[i];

				const task: any = function task() {
					return promise(item)
						.then(
							(result: any) => {

								if (sequential === true) {
									results[i] = result;
								} else {
									results.push(result);
								}

								if (++completed === length) {
									resolve(results);
								}
							}
						)
						.catch(reject);
				};

				queue.pushTask(task);

			}

		});

}
