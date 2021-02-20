/**
 * Created by Yes.Man on 2021/2/20 7:52 上午.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* ========================================== 装饰器 ========================================== */
function sealed(target) {
    // do something with 'target' ...
}
// 装饰器工厂
function color(value) {
    return function (target) {
        // do something with 'target' ...
    };
}
function f() {
    console.log('f(): evaluated.');
    return function (target, propertyKey, descriptor) {
        console.log('f(): called.');
    };
}
function g() {
    console.log('g(): evaluated.');
    return function (target, propertyKey, descriptor) {
        console.log('g(): called.');
    };
}
class C {
    method() { }
}
__decorate([
    f(),
    g()
], C.prototype, "method", null);
// .......................
const user = {
    user: 'peter',
    roles: [
        { role: 'user' }
        // { role: 'admin' }
    ]
};
function isInRole(role) {
    return user.roles.some(r => r.role === role);
}
function Admin(target, key, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        if (isInRole('admin')) {
            originalMethod.apply(this, arguments);
            return;
        }
        console.log(`${user.user} is not in the admin role.`);
    };
    return descriptor;
}
// 工厂模式
function Role(role) {
    return function (constructor) {
        if (!isInRole(role)) {
            throw new Error(`The user is not authorized to access this class.`);
        }
    };
}
let NoRoleCheck = class NoRoleCheck {
    AnyoneCanRun(args) {
        console.log(args);
    }
    // @Admin
    AdminOnly(args) {
        console.log(args);
    }
};
NoRoleCheck = __decorate([
    Role('admin')
], NoRoleCheck);
function TestDecoratorExample(decoratorMethod) {
    console.log(`Current user ${user.user}.`);
    decoratorMethod.AnyoneCanRun(`Running as user.`);
    decoratorMethod.AdminOnly(`Running as admin.`);
}
TestDecoratorExample(new NoRoleCheck());
