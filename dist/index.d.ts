export declare type IPromiseFunction<T, R> = (item: T) => Promise<R>;
export declare const enum Concurrency {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}
export default function promises<T, R>(items: Array<T>, promise: IPromiseFunction<T, R>, concurrency?: Concurrency, sequential?: boolean): Promise<R[]>;
