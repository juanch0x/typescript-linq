"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
/**
 * Generic list
 */
var List = /** @class */ (function () {
    // constructor();
    function List(baseArray) {
        var _this = this;
        this.array = [];
        //#region filtering
        this.firstOrDefault = function (condition) {
            for (var _i = 0, _a = _this.array; _i < _a.length; _i++) {
                var element = _a[_i];
                if (condition(element))
                    return element;
            }
            return null;
        };
        this.first = function (condition) {
            _this.throwIfEmpty();
            if (condition) {
                for (var _i = 0, _a = _this.array; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (condition(element))
                        return element;
                }
                throw new Error("no elements");
            }
            return _this.array[0];
        };
        this.lastOrDefault = function (condition) {
            for (var _i = 0, _a = __spreadArrays(_this.array).reverse(); _i < _a.length; _i++) {
                var element = _a[_i];
                if (condition(element))
                    return element;
            }
            return null;
        };
        this.last = function (condition) {
            for (var _i = 0, _a = __spreadArrays(_this.array).reverse(); _i < _a.length; _i++) {
                var element = _a[_i];
                if (condition(element))
                    return element;
            }
            throw new Error("no elements");
        };
        this.where = function (condition) {
            return _this.asList(__spreadArrays(_this.array).filter(condition));
        };
        this.skip = function (num) {
            if (num <= _this.count() && num >= 0)
                return _this.asList(_this.array.slice(num));
            throw new Error("You can't skip " + num + " items if the list has " + _this.count());
        };
        this.take = function (num) {
            var length = _this.count();
            if (length <= 0)
                throw Error('invalid argument');
            else if (num > length)
                throw Error("You can't take " + num + " elements if the list has " + length);
            else if (length === num)
                return _this;
            var newList = new List();
            for (var i = 0; i < num; i++) {
                newList.add(_this.array[i]);
            }
            return newList;
        };
        this.count = function (condition) {
            if (!condition)
                return _this.array.length;
            return _this.where(condition).toArray().length;
        };
        this.any = function (condition) {
            if (condition)
                return _this.array.some(condition);
            return _this.count() > 0;
        };
        this.all = function (condition) {
            return _this.array.every(condition);
        };
        //#endregion filtering
        //#region aggregate
        this.sum = function (nums) {
            return _this.array.reduce(function (ac, v) {
                return Number(ac) + nums(v);
            }, 0);
        };
        this.average = function (nums) {
            if (_this.count() === 0)
                return 0;
            return _this.array.reduce(function (ac, v) {
                return Number(ac) + nums(v);
            }, 0) / _this.count();
        };
        this.max = function (convertion) {
            if (convertion) {
                return Math.max.apply(null, _this.select(convertion).toArray());
            }
            if (_this.all(function (x) { return !isNaN(x); })) {
                return Math.max.apply(null, _this.select(function (x) { return Number(x); }).toArray());
            }
        };
        //#endregion
        this.select = function (convertion) {
            return new List(_this.array.map(convertion));
        };
        //#region ordering
        this.orderBy = function (condition) {
        };
        //#endregion ordering
        //#region others
        this.add = function (t) {
            _this.array.push(t);
        };
        this.toArray = function () {
            return __spreadArrays(_this.array);
        };
        this.asList = function (t) {
            return new List(t);
        };
        this.toString = function () {
            return "[ " + _this.array.join(' , ') + " ]";
        };
        //#endregion others
        //#region  localMethods
        this.throwIfEmpty = function () {
            if (!_this.array || _this.count() === 0)
                throw Error('empty list');
        };
        if (baseArray) {
            this.array = baseArray;
        }
    }
    return List;
}());
exports.List = List;
