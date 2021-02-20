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
