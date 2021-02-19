/**
 * Created by Yes.Man on 2021/2/18 4:05 下午.
 */

/* ========================================== 联合类型 ========================================== */

function padLeft (value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value;
  }

  if (typeof padding === 'string') {
    return padding + value;
  }

  throw new Error(`Expected string or number, got '${ padding }'.`);
}

console.log(padLeft('Hello world', 4)); //     Hello world
// console.log(padLeft('Hello world', true)); // Error

// ....................
interface Bird {
  fly ();
  layEggs ();
}

interface Fish {
  swim ();
  layEggs ();
}

function getSmallPet (): Fish | Bird {
  return <Fish | Bird>{};
}

const pet = getSmallPet();
pet.layEggs();
// pet.fly(); Error

if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else if ((<Bird>pet).fly) {
  (<Bird>pet).fly();
}

// 用户自定义的类型保护
// 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词

/*
* pet is Fish就是类型谓词。
* 谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
*/
function isFish (pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// typeof类型保护
function isNumber (x: any): x is number {
  return typeof x === 'number';
}

function isString (x: any): x is string {
  return typeof x === 'string';
}

function otherPadLeft (value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value;
  }

  if (isString(padding)) {
    return padding + value;
  }

  throw new Error(`Expected string or number, got '${ padding }.`);
}

// instanceof类型保护
interface Padder {
  getPaddingString (): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor (private numSpaces: number) {}

  getPaddingString () {
    return Array(this.numSpaces + 1).join(' ');
  }
}

class StringPadder implements Padder {
  constructor (private value: string) {}

  getPaddingString () {
    return this.value;
  }
}

function getRandomPadder () {
  return Math.random() < 0.5 ? new SpaceRepeatingPadder(4) : new StringPadder(' ');
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  console.log('SpaceRepatingPadder', padder); // 类型细化为'SpaceRepeatingPadder'
}

if (padder instanceof StringPadder) {
  console.log('StringPadder', padder); // 类型细化为'StringPadder'
}

// 可以为null类型
// --strictNullChecks标记可以解决此错误：当你声明一个变量时，它不会自动地包含 null或 undefined
let sn: string | null = 'bar';
sn = null;
// sn = undefined; // error

// 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined:
function f (x: number, y?: number) {
  return x + (y || 0);
}

f(1);
f(1, 2);
f(1, undefined);
// f(1, null); // error

// 类型保护和类型断言
function broken (name: string | null): string {
  name = name || 'Bob';

  function postfix (epithet: string) {
    return name.charAt(0) + '. the' + epithet;
  }

  return postfix('great');
}

function fixed (name: string | null): string {
  name = name || 'Bob';

  function postfix (epithet: string) {
    return name!.charAt(0) + '. the' + epithet;
  }

  return postfix('great');
}

// 类型别名
type Name = string;
type Resolver = () => string;
type NameOrResolver = Name | Resolver;

function getName (n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}

type Container<T> = { value: T };
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
  name: string;
}

let people: LinkedList<Person>;
let ss = people.name;
ss = people.next.name;
ss = people.next.next.name;
ss = people.next.next.next.name;
