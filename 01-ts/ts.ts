/**
 * Created by Yes.Man on 2021/8/28 18:12.
 * @file: ts
 */

/* ========================================== 联合类型 ========================================== */

class RangeValidationBase {
  constructor (private start: number, private end: number) {}

  protected rangeCheck (value: number): boolean {
    return value >= this.start && value <= this.end;
  }

  protected getNumber (value: string): number {
    return Number(value).valueOf();
  }
}

class UnionRangeValidation extends RangeValidationBase {
  isInRange (value: string | number): boolean {
    if (typeof value !== 'number') {
      value = this.getNumber(value);
    }

    return this.rangeCheck(value);
  }
}

const union = new UnionRangeValidation(5, 15);
console.log(union.isInRange('13'));

/* ========================================== 装饰器descriptor ========================================== */

const user = {
  username: 'peter',
  roles: [
    { role: 'user' },
    { role: 'admin' }
  ]
};

function IsInRole (role: string): boolean {
  return user.roles.some(r => r.role === role);
}

function Admin (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;

  descriptor.value = function () {
    if (IsInRole(`admin`)) {
      return originalMethod.apply(this, arguments);
    }

    console.log(`${ user.username } is not in the admin role.`);
  };

  return descriptor;
}

class RoleCheck {
  AnyoneRun (args: string): void {
    console.log(args);
  }

  @Admin
  AdminOnly (args: string): void {
    console.log(args);
  }
}

const roleCheck = new RoleCheck();
roleCheck.AnyoneRun('anyone');
roleCheck.AdminOnly('admin');

/* ========================================== mixin ========================================== */

type Constructor<T = {}> = new (...args: any[]) => T

function RecordStatus<T extends Constructor> (base: T) {
  return class extends base {
    Delete: boolean = false;
  };
}

class Person {

}

const ActivePerson = RecordStatus(Person);

/* ========================================== 泛型 ========================================== */

class Queue<T> {
  private queue: T[] = [];

  public push (value: T) {
    this.queue.push(value);
  }

  public pop (): T | undefined {
    return this.queue.shift();
  }
}

const queue: Queue<number> = new Queue<number>();
queue.push(12);
queue.push(13);
queue.pop();
