"use strict";

export default class TaskQueue {

    private concurrency: number;
    private running: number = 0;
    private queue: Array<Promise<any>> = [];

    constructor(concurrency: number) {
        this.concurrency = concurrency;
    }

    public pushTask(task: Promise<any>): void {
        this.queue.push(task);
        this.next();
    }

    public next(): void {
        while (this.running < this.concurrency && this.queue.length) {
            const task: any = this.queue.shift();
            task().then(() => {
                this.running--;
                this.next();
            });
            this.running++;
        }
    }

}
