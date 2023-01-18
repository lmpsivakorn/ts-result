# Result

A utility class for handling the result of an operation that may succeed or fail.
Usage

Create a new instance of the Result class by calling the ok or fail static methods. The ok method creates an instance with a successful result, while the fail method creates an instance with a failed result.

# Install
deno 
```typescript
import Result from "https://deno.land/x/ts_result@release/src/mod.ts"
```

nodejs
```typescript
yarn add @lmpsivakorn/ts_result
// or
npm i @lmpsakorn/ts_result
```

```typescript
import Result from './result'

const success = Result.ok(1)
const failure = Result.fail(new Error('Something went wrong'))
```
You can then use the instance methods to handle the result. The map method can be used to transform a successful result, while the catch method can be used to handle a failed result.
```typescript
const doubled = success.map((value) => value * 2)
const message = failure.catch((error) => error.message)
```
The unwrap method can be used to extract the value from a successful result, while the wrap method returns an object with the properties ok and fail, representing the successful and failed results respectively.
```typescript
const value = success.unwrap() // 1
const wrapped = failure.wrap() // { ok: undefined, fail: Error: Something went wrong }
```
The toString method returns a string representation of the result, and the toJSON method returns the wrapped result.
```typescript
console.log(success.toString()) // { ok: 1, fail: undefined }
console.log(failure.toJSON()) // { ok: undefined, fail: Error: Something went wrong }
```
# Types

The Result class is generic, and the type of the successful and failed results can be specified.
```typescript
const success = Result.ok<number>(1)
const failure = Result.fail<string>(new Error('Something went wrong'))
```
## TWrap
```typescript
interface TWrap<T> {
  ok: T | undefined,
  fail: Error | undefined
}
```
# API
### constructor

constructor(value: T | undefined, error: Error | undefined)
### static ok<T>(value: T): Result<T>

Create a new instance of the Result class with a successful result.
### static fail<T>(error: Error | string): Result<T>

Create a new instance of the Result class with a failed result.
### map<U>(onFulfilled: (value: T) => U): Result<U> | Result<T>

Transform a successful result.
### catch<U>(onRejected: (error: Error) => U): Result<U> | Result<T>

Handle a failed result.
### unwrap(): T | unknown

Extract the value from a successful result.
### wrap(): TWrap<T>

Return an object with the properties ok and fail, representing the successful and failed results respectively.
### toString(): string

Return the wrapped result.

# Example
```typescript
import Result from './result'

// Create a new instance with a successful result
const success = Result.ok(1)
console.log(success.unwrap()) // 1
console.log(success.wrap()) // { ok: 1, fail: undefined }
console.log(success.toString()) // { ok: 1, fail: undefined }

// Create a new instance with a failed result
const failure = Result.fail(new Error('Something went wrong'))
console.log(failure.catch((error) => error.message)) // 'Something went wrong'
console.log(failure.wrap()) // { ok: undefined, fail: Error(Something went wrong) }

// Transform a successful result
const doubled = success.map((value) => value * 2)
console.log(doubled.unwrap()) // 2

// Handle a failed result
const message = failure.catch((error) => error.message)
console.log(message.unwrap()) // 'Something went wrong'

```