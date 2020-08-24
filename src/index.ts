"use strict";

import TaskQueue, { IPromiseTask } from './TaskQueue';

export type IPromiseFunction<T, R> = (item: T) => Promise<R>;

export enum Concurrency {
	ONE = 1,
	TWO = 2, 
	THREE = 3,
	FOUR = 4,
	FIVE = 5
}

export default async function promises <T, R> (
	items: Array<T>,
	promise: IPromiseFunction<T, R>,
	concurrency: Concurrency = Concurrency.ONE,
	sequential: boolean = true
): Promise<R[]> {

	if (concurrency <= 0) {
		return Promise.reject(
			new Error("A valid integer must be used for concurrency parameter")
		);
	}

	const length: number = items.length;

	if (length === 0) {
		return Promise.resolve([]);
	}

	const queue = new TaskQueue<R>(concurrency);
	const results: R[] = [];

	return new Promise (

		(resolve: any, reject: any) => {

			let completed: number = 0;

			for (let i = 0; i < length; i++) {

				let item = items[i];

				const task: IPromiseTask<R> = async () => {
					try {
						const result = await promise(item);
						if (sequential === true) {
							results[i] = result;
						} else {
							results.push(result);
						}

						if (++completed === length) {
							resolve(results);
						}
					} catch (e) {
						return reject(e);
					}
					return true;
				}

				queue.pushTask(task);

			}

		});

}
