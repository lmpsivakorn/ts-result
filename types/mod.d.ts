export declare type TWrap<T> = {
    ok: T | undefined;
    fail: Error | undefined;
};
export default class Result<T> {
    protected readonly _value: T | undefined;
    protected readonly _error: Error | undefined;
    constructor(_value: T | undefined, _error: Error | undefined);
    static ok<T>(value: T): Result<T>;
    static fail<T>(error: Error | string): Result<T>;
    map<U>(onFulfilled: (value: T) => U): Result<U> | Result<T>;
    catch<U>(onRejected: (error: Error) => U): Result<U> | Result<T>;
    unwrap(): T | unknown;
    wrap(): TWrap<T>;
    toString(): string;
}
