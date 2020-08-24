export declare type IPromiseTask<R> = () => Promise<boolean>;
export default class TaskQueue<R> {
    private concurrency;
    private running;
    private queue;
    constructor(concurrency: number);
    pushTask(task: IPromiseTask<R>): void;
    next(): void;
}
