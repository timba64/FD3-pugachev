var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (pr) {
        this.products.push(pr);
    };
    Scales.prototype.getSumScale = function () {
        var _weight = 0;
        this.products.forEach(function (el) {
            _weight += el.getScale();
        });
        return _weight;
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        this.products.forEach(function (el) {
            nameList.push(el.getName());
        });
        return nameList;
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product() {
        this.name = "";
        this.weight = 0;
    }
    Product.prototype.getScale = function () {
        return this.weight;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(_name, _weight) {
        var _this = _super.call(this) || this;
        _this.name = _name;
        _this.weight = _weight;
        return _this;
    }
    return Apple;
}(Product));
var Banane = /** @class */ (function (_super) {
    __extends(Banane, _super);
    function Banane(_name, _weight) {
        var _this = _super.call(this) || this;
        _this.name = _name;
        _this.weight = _weight;
        return _this;
    }
    return Banane;
}(Product));
var myScales = new Scales();
var apple_1 = new Apple("Яблоко-1", 1.2);
var apple_2 = new Apple("Яблоко-2", 0.8);
var banane_1 = new Banane("Банан-1", 2.1);
myScales.add(apple_1);
myScales.add(apple_2);
myScales.add(banane_1);
//myScales.getSumScale();
//myScales.getNameList();
console.log(myScales.getSumScale() + " - общий вес продуктов");
console.log("продукт - " + myScales.getNameList());
//# sourceMappingURL=app.js.map