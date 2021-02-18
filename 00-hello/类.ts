/**
 * Created by Yes.Man on 2021/2/16 10:28 下午.
 */

class Greeter {
  greeting: string;

  constructor (msg: string) {
    this.greeting = msg;
  }

  greet (): string {
    return `Hello, ${ this.greeting }`;
  }
}

const greeter = new Greeter('World');
console.log(greeter.greet());

/* ========================================== 继承 ========================================== */

class Animal {
  // 默认是public
  public name: string;

  // 当成员被标记成 private时，它就不能在声明它的类的外部访问。
  private _name: string;

  public constructor (name: string) {
    this.name = name;
    this._name = name;
  }

  public move (distanceInMeters: number = 0) {
    console.log(`${ this.name } moved ${ distanceInMeters }m.`);
  }
}

// Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。
class Dog extends Animal {
  bark () {
    console.log(`Woof! Woof.`);
  }
}

const dog = new Dog('dog');
dog.bark();
dog.move(10);
dog.bark();

class Snake extends Animal {
  constructor (name: string) {
    super(name);
  }

  move (distanceInMeters: number = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor (name: string) {
    super(name);
  }

  move (distanceInMeters: number = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');

sam.move();
tom.move(34);

// ...................
class Rhino extends Animal {
  constructor () {
    super('Rhino');
  }
}

class Employee {
  private _name: string;

  constructor (name: string) {
    this._name = name;
  }
}

let animal = new Animal('Goat');
let rhino = new Rhino();
let employee = new Employee('Bob');

animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.

/* ========================================== protected ========================================== */

// protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。
class Person {
  protected name: string;

  constructor (name: string) {
    this.name = name;
  }
}

class Miss extends Person {
  private department: string;

  constructor (name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch () {
    return `Hello, my name is ${ this.name } and I work in ${ this.department }.`;
  }
}

let howard = new Miss('Howard', 'Sales');
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误

// .................
class A {
  protected constructor () {}
}

class B extends A {
  constructor () {
    super();
  }
}

// const a = new A(); // Constructor of class 'A' is protected and only accessible within the class declaration.
const b = new B();

// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
abstract class D {
  abstract fun (): void;

  move (): void {
    console.log('move...');
  }
}

abstract class Department {
  constructor (public name: string) {}

  printName (): void {
    console.log('Department name: ' + this.name);
  }

  abstract printMeeting (): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor () {
    super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting (): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports (): void {
    console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在
