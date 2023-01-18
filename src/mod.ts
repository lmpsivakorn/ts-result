export type TWrap<T> = { ok: T | undefined, fail: Error | undefined }

export default class Result<T> {
  constructor(
    protected readonly _value: T | undefined,
    protected readonly _error: Error | undefined,
  ){}

  public static ok <T>(value : T): Result<T> {
    return new Result<T>(value, undefined)
  }

  public static fail <T>(error : Error|string): Result<T> {
    if (typeof error === 'string')  return new Result<T>(undefined, new Error(error))
    return new Result<T>(undefined, error)
  }

  public map<U>(onFulfilled: (value: T) => U): Result<U> | Result<T> {
    if (typeof this._error === 'undefined') {
      try {
        if (typeof this._value !== 'undefined') {
          const newValue = onFulfilled(this._value)
          return new Result<U>(newValue, this._error)
        }
      }
      catch (error) {
        return new Result<T>(undefined, error)
      }
    }
    return this
  }

  public catch<U>(onRejected: (error: Error) => U): Result<U> | Result<T> {
    if (typeof this._error !== 'undefined') {
      try {
        const newValue = onRejected(this._error)
        return new Result<U>(newValue, this._error)
      }
      catch (error) {
        return new Result<T>(undefined, error)
      }
    }
    return this
  }

  public unwrap(): T | unknown {
    if (typeof this._value !== 'undefined') return this._value as T
    if (typeof this._error!== 'undefined') throw new Error('value is undefined')
    throw this._error
  }

  public wrap(): TWrap<T> {
    return { ok: this._value, fail: this._error }
  }

  public toString(): string {
    return JSON.stringify(this, undefined, 2)
      .replace('_error', 'fail')
      .replace('_value', 'ok')
  }
}