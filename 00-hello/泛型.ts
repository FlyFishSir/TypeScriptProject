/**
 * Created by Yes.Man on 2021/2/17 10:54 下午.
 */

/* ========================================== 泛型 ========================================== */

function identity<T> (arg: T): T {
  return arg;
}

interface Lengthwise {
  length: number;
}

// function loggingIdentity<T> (arg: T[]): T[] {
function loggingIdentity<T extends Lengthwise> (arg: T): T {
  console.log(arg.length);
  return arg;
}

const myIdentity: <T> (arg: T) => T = identity;
const myIdentity1: { <U> (arg: U): U } = identity;

// ...............
interface GenericIdentityFn<T> {
  <T> (arg: T): T;
}

const myIdentity2: GenericIdentityFn<number> = identity;
