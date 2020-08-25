export type IPromiseFunction<T, R> = (item: T) => Promise<R>;

export const enum Concurrency {
	ONE = 1,
	TWO = 2, 
	THREE = 3,
	FOUR = 4,
	FIVE = 5
}

type IPromiseTask<R> = () => Promise<boolean>;

class TaskQueue<R> {

    private _concurrency: Concurrency;
    private _running: number = 0;
    private _queue: Array<IPromiseTask<R>> = [];

    constructor(concurrency: number) {
        this._concurrency = concurrency;
    }

    public pushTask(task: IPromiseTask<R>): void {
        this._queue.push(task);
        this.next();
    }

    public next(): void {
        while (this._running < this._concurrency && this._queue.length) {
			const task: IPromiseTask<R> | undefined = this._queue.shift();
			if (task) {
				task().then((result: boolean) => {
					this._running--;
					this.next();
					return result;
				});
			}
            this._running++;
        }
    }

}

export default async function promises <T, R> (
	items: Array<T>,
	promise: IPromiseFunction<T, R>,
	concurrency: Concurrency = Concurrency.ONE,
	sequential: boolean = true
): Promise<R[]> {

	if (concurrency < 1 || concurrency > 5) {
		return Promise.reject(
			new Error("A integer value between 0 and 5 must be used for the concurrency parameter")
		);
	}

	const length: number = items.length;

	if (length === 0) {
		return Promise.resolve([]);
	}

	const queue: TaskQueue<R> = new TaskQueue<R>(concurrency);
	const results: R[] = [];

	return new Promise (

		(resolve, reject): void => {

			let completed: number = 0;

			for (let i = 0; i < length; i++) {

				let item: T = items[i];

				const task = async (): Promise<boolean> => {
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
						reject(e);
					}
					return true;
				}

				queue.pushTask(task);

			}

		});

}
