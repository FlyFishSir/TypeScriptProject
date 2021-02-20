/**
 * Created by Yes.Man on 2021/2/20 7:52 上午.
 */

/* ========================================== 装饰器 ========================================== */

function sealed (target) {
  // do something with 'target' ...
}

// 装饰器工厂
function color (value: string) { // 这是一个装饰器工厂
  return function (target) { // 这是装饰器
    // do something with 'target' ...
  };
}

function f () {
  console.log('f(): evaluated.');
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called.');
  };
}

function g () {
  console.log('g(): evaluated.');
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called.');
  };
}

class C {
  @f()
  @g()
  method () {}
}

// .......................
const user = {
  user: 'peter',
  roles: [
    { role: 'user' }
    // { role: 'admin' }
  ]
};

function isInRole (role: string) {
  return user.roles.some(r => r.role === role);
}

function Admin (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function () {
    if (isInRole('admin')) {
      originalMethod.apply(this, arguments);
      return;
    }

    console.log(`${ user.user } is not in the admin role.`);
  };

  return descriptor;
}

// 工厂模式
function Role (role: string) {
  return function (constructor: Function) {
    if (!isInRole(role)) {
      throw new Error(`The user is not authorized to access this class.`);
    }
  };
}

interface IDecoratorExample {
  AnyoneCanRun (args: string): void;
  AdminOnly (args: string): void;
}

@Role('admin')
class NoRoleCheck implements IDecoratorExample {
  AnyoneCanRun (args: string) {
    console.log(args);
  }

  // @Admin
  AdminOnly (args: string) {
    console.log(args);
  }
}

function TestDecoratorExample (decoratorMethod: IDecoratorExample) {
  console.log(`Current user ${ user.user }.`);
  decoratorMethod.AnyoneCanRun(`Running as user.`);
  decoratorMethod.AdminOnly(`Running as admin.`);
}

TestDecoratorExample(new NoRoleCheck());
