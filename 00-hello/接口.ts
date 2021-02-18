/**
 * Created by Yes.Man on 2021/2/16 2:08 下午.
 */

/* ========================================== 接口 ========================================== */

/**
 * TypeScript的核心原则之一是对值所具有的结构进行类型检查。
 * 它有时被称做“鸭式辨型法”或“结构性子类型化”。
 * 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
 */

interface LabelledValue {
  label: string;
}

function printLabel (labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

const obj = {
  size: 10,
  label: 'Size 10 Object'
};

printLabel(obj);

// 可选属性 options bags
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

function createSquare (config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 1000 };

  if (config.color) {
    newSquare.color = config.color;
  }

  if (config.width) {
    newSquare.area = config.width ** 2;
  }

  return newSquare;
}

console.log(createSquare({ color: 'black', width: 500, coli: 'ee' }));

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

// 赋值后， x和y再也不能被改变了
let p: Point = { x: 10, y: 20 };
// p.x = 5; // Cannot assign to 'x' because it is a read-only property.

// ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
let a: number[] = [ 1, 2, 3, 4 ];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
a = ro as number[]; // 类型断言重写

// 函数类型
/**
 * 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
 * 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
 */
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};

let otherSearch: SearchFunc;
otherSearch = function (src: string, sub: string) {
  let result = src.search(sub);
  return result > -1;
};

// 可索引的类型
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = [ 'Bob', 'Fred' ];

let myStr: string = myArray[0];

class Animal {
  name: string;
}

class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  // [x: number]: Animal;
  [x: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number;
  length: number;
  name: number;
  // name: string; // 错误，`name`的类型与索引类型返回值的类型不匹配
}

// 将索引签名设置为只读，这样就防止了给索引赋值
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myRA: ReadonlyStringArray = [ 'Alice', 'Bob' ];
// myRA[2] = 'Mallory'; // error

// 类类型 => 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。
interface ClockInterface {
  currentTime: Date;
  setTime (d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date;

  constructor (h: number, m: number) {}

  setTime (d: Date) {
    this.currentTime = d;
  }
}

// 类静态部分与实例部分的区别
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface1;
}

interface ClockInterface1 {
  tick ();
}

function createClock (ctor: ClockConstructor, hour: number, minute: number): ClockInterface1 {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface1 {
  constructor (h: number, m: number) {}

  tick () {
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface1 {
  constructor (h: number, m: number) {}

  tick () {
    console.log('tick tock');
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 继承接口
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = 'yellow';
square.sideLength = 10;
square.penWidth = 5.0;

// 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset (): void;
}

function getCounter (): Counter {
  let counter = <Counter>function (start: number) {};

  counter.interval = 123;
  counter.reset = function () {};

  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select (): void;
}

class Button extends Control implements SelectableControl {
  select () { }
}

class TextBox extends Control {
  select () { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select () { }
// }
//
// class Location {}
