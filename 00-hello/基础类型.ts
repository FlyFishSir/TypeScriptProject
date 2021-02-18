// 布尔值
let isDone: boolean = true;

// 数字
let num: number = 16;

// 字符串
let str: string = `string`;

// 数组
let list: number[] = [ 1, 2, 3 ];
let arr: Array<number> = [ 1, 2, 3 ]; // Array<元素类型> 数组泛型

// 元组 Tuple => 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
let x: [ string, number ];
x = [ 'hello', 10 ];
// x = [10, 'hello']; // Error

// 枚举
enum Color { Red, Green = 2, Blue };
let c: Color = Color.Red;
let colorName: string = Color[0];
console.log(colorName);

// Any
let a: any[] = [ 1, true, 'free' ];
list[1] = 100;

// Void 只能为它赋予undefined和null
let unusable: void = undefined;

// Null Undefined 默认情况下null和undefined是所有类型的子类型。
/**
 * 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
 * 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，
 * 你可以使用联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。
 */
let u: undefined = undefined;
let n: null = null;

// Never => never类型表示的是那些永不存在的值的类型。
/**
 * never类型是任何类型的子类型，也可以赋值给任何类型；
 * 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
 */
// 返回never的函数必须存在无法达到的终点
function error (msg: string): never {
  throw new Error(msg);
}

// 推断的返回值类型为never
function fail (): never {
  return error('Something failed');
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop (): never {
  while (true) {
  }
}

// Object => object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
declare function create (o: object | null): void;

create({ prop: 0 });
create(null);
create(undefined);

// 类型断言
let someValue: any = 'this is a string';
let strLen: number = (<string>someValue).length;
// let strLen: number = (someValue as string).length;
