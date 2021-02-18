/**
 * Created by Yes.Man on 2021/2/18 10:59 上午.
 */

/* ========================================== 类型兼容性 ========================================== */

interface Named {
  name: string;
}

class Person {
  name: string;
}

const p: Named = new Person();

function greet (n: Named): string {
  return `Hello, ${ n.name }`;
}

let x: Named;
let y = { name: 'Alice', location: 'Hangzhou' };
x = y; // OK
greet(y);

// 比较两个函数
let fn1 = (x: number) => 0;
let fn2 = (a: number, b: string) => 0;
// fn1 = fn2; // Error
fn2 = fn1; // OK

const items = [ 1, 2, 3 ];

items.forEach((item, index, arr) => {
  console.log(item);
});

items.forEach(item => {
  console.log(item);
});

// 函数参数双向协变
enum EventType {
  Mouse,
  Keyboard
}

interface Event {
  timestamp: number;
}

interface MouseEvent extends Event {
  a: number;
  b: number;
}

interface KeyEvent extends Event {
  keyCode: number;
}

function listenEvent (eventType: EventType, handler: (n: Event) => void) {
  /**   .......     */
}

listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(`${ e.a }, ${ e.b }`));
listenEvent(EventType.Mouse, (e: Event) => console.log(`${ (<MouseEvent>e).a }, ${ (<MouseEvent>e).b }`));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.a + ',' + e.b)));
// listenEvent(EventType.Mouse, (e: number) => console.log(e)); // Error

// 可选参数及剩余参数
function invokeLater (args: any[], callback: (...arg: any[]) => void) {
  /* ...... */
}

invokeLater([ 1, 2 ], (x, y) => console.log(x + ', ' + y));
invokeLater([ 1, 2 ], (x?, y?) => console.log(x + ', ' + y));

// 类  比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。
class Animal {
  feet: number;
  constructor (name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor (numFeet: number) {}
}

let a: Animal;
let s: Size;

a = s; // OK
s = a; // OK

// 泛型
interface Empty<T> {
  /* ,,,,,,, */
}

let ex: Empty<number>;
let ey: Empty<string>;
ex = ey; // 因为TypeScript是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型。

interface NotEmpty<T> {
  data: T;
}

let nx: NotEmpty<number>;
let ny: NotEmpty<string>;
// nx = ny; // Error

let identity = function <T> (x: T): T {
  return x;
};

let reverse = function <U> (y: U): U {
  return y;
};

identity = reverse; // OK, because (x: any) => any matches (y: any) => any
