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
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}
