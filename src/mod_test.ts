import { assertEquals } from "https://deno.land/std@0.173.0/testing/asserts.ts";
import Result from './mod.ts'

Deno.test("Test ok method", () => {
  const success = Result.ok(1)
  assertEquals(success.unwrap(), 1)
  assertEquals(success.wrap(), { ok: 1, fail: undefined })
});

Deno.test("Test fail method", () => {
  const failure = Result.fail(new Error('Something went wrong'))
  assertEquals(failure.catch((error: Error) => error.message).unwrap(), 'Something went wrong')
  assertEquals(failure.wrap(), { ok: undefined, fail: Error('Something went wrong') })
});

Deno.test("Test map method", () => {
  const success = Result.ok(1)
  const doubled = success.map((value: number) => value * 2)
  assertEquals(doubled.unwrap(), 2)
});

Deno.test("Test catch method", () => {
  const failure = Result.fail(new Error('Something went wrong'))
  const message = failure.catch((error: Error) => error.message)
  assertEquals(message.unwrap(), 'Something went wrong')
});
