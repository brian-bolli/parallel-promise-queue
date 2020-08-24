"use strict";

export type IPromiseTask<R> = () => Promise<boolean>;

export default class TaskQueue<R> {

    private concurrency: number;
    private running: number = 0;
    private queue: Array<IPromiseTask<R>> = [];

    constructor(concurrency: number) {
        this.concurrency = concurrency;
    }

    public pushTask(task: IPromiseTask<R>): void {
        this.queue.push(task);
        this.next();
    }

    public next(): void {
        while (this.running < this.concurrency && this.queue.length) {
			const task: IPromiseTask<R> | undefined = this.queue.shift();
			if (task) {
				task().then((result: boolean) => {
					this.running--;
					this.next();
					return result;
				});
			}
            this.running++;
        }
    }

}
