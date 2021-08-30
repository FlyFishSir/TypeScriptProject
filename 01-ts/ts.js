/**
 * Created by Yes.Man on 2021/8/28 18:12.
 * @file: ts
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* ========================================== 联合类型 ========================================== */
var RangeValidationBase = /** @class */ (function () {
    function RangeValidationBase(start, end) {
        this.start = start;
        this.end = end;
    }
    RangeValidationBase.prototype.rangeCheck = function (value) {
        return value >= this.start && value <= this.end;
    };
    RangeValidationBase.prototype.getNumber = function (value) {
        return Number(value).valueOf();
    };
    return RangeValidationBase;
}());
var UnionRangeValidation = /** @class */ (function (_super) {
    __extends(UnionRangeValidation, _super);
    function UnionRangeValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnionRangeValidation.prototype.isInRange = function (value) {
        if (typeof value !== 'number') {
            value = this.getNumber(value);
        }
        return this.rangeCheck(value);
    };
    return UnionRangeValidation;
}(RangeValidationBase));
var union = new UnionRangeValidation(5, 15);
console.log(union.isInRange('13'));
/* ========================================== 装饰器descriptor ========================================== */
var user = {
    username: 'peter',
    roles: [
        { role: 'user' },
        { role: 'admin' }
    ]
};
function IsInRole(role) {
    return user.roles.some(function (r) { return r.role === role; });
}
function Admin(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        if (IsInRole("admin")) {
            return originalMethod.apply(this, arguments);
        }
        console.log(user.username + " is not in the admin role.");
    };
    return descriptor;
}
var RoleCheck = /** @class */ (function () {
    function RoleCheck() {
    }
    RoleCheck.prototype.AnyoneRun = function (args) {
        console.log(args);
    };
    RoleCheck.prototype.AdminOnly = function (args) {
        console.log(args);
    };
    __decorate([
        Admin
    ], RoleCheck.prototype, "AdminOnly");
    return RoleCheck;
}());
var roleCheck = new RoleCheck();
roleCheck.AnyoneRun('anyone');
roleCheck.AdminOnly('admin');
