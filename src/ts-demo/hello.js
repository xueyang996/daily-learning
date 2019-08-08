var obj = { a: 12, b: "12" };
var list1 = [1, "2"];
//  可枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
Color[2] === "blue";
var obj1 = {};
['a', 'b'].forEach(function (item) {
    obj1[item] = item;
});
obj1.a = 1234;
var n1 = null;
var n2 = undefined;
function error() {
    throw '错了';
}
var core = function (a, b) {
    return [a, b];
};
// 泛型
function convert(input) {
    return input;
}
var Person = /** @class */ (function () {
    function Person(who) {
        this.who = who;
    }
    Person.prototype.say = function (code) {
        return this.who + ' :i am ' + code;
    };
    return Person;
}());
var ab = new Person('james bond');
var a = new Person('james bond');
a.say('007');
var convert2 = convert;
var apple = { id: 1, title: '苹果', size: 'large' };
function echo(input) {
    // console.log(input.name);
    return input;
}
function echoExtra(input) {
    console.log(input.name);
    return input;
}
// 泛型， 工厂函数
// 如果一个数据是可以实例化的, 我们可以用{new(): any}表示.
function create(O) {
    return new O();
}
// 自动推断
var n = 1;
n += 3;
var arr1 = [];
arr1.push(1);
var arr = ["1"];
arr.push('2');
// 浏览器自带api
document.ontouchstart = function (ev) {
    console.log(ev.touches);
};
// typeof instanceof 类型保护
var nn = 0.5 < Math.random() ? 1 : '1';
if ('number' === typeof nn) {
    nn *= 2;
}
else {
    nn = '2';
}
var arrNum = 0.5 < Math.random() ? 1 : [1];
// 断言，告诉ts，arrNum为数组
arrNum.push(1);
arrNum.push(1);
var aaa = 'right';
var ccc = { b: 'sdfsdf' };
var a3 = { a: 1, b: 'sdf' };
