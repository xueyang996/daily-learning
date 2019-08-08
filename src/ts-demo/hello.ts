interface A {
  a: number,
  b: string,
}
let obj:A = {a: 12, b: 'sdf'};
let list1:[number, string] = [1, "2"];
//  可枚举
enum Color {Red, Green, Blue}
Color[2] === "blue"

let obj1:any = {};

['a', 'b'].forEach(item =>{
  obj1[item] = item
} )

obj1.a = 1234

const n1:null = null;
const n2:undefined = undefined;

function error():never{
  throw '错了'
}

// 定义函数
interface Core {
  (n: number, s: string) : [number, string]
}
const core:Core = (a, b) => {
  return[a, b]
}

// 泛型
function convert<T>(input:T):T {
  return input;
}

class Person<U> {
  who: U;
  constructor(who: U) {
    this.who = who;
  }

  say(code:U):string {
    return this.who + ' :i am '+code
  }
}
let ab = new Person<string>('james bond');
let a = new Person('james bond');
a.say('007');

interface Convert{
  <U>(input:U):U
}
let convert2:Convert = convert;

// 泛型接口
interface Goods<T>{
  id:number;
  title:string;
  size: T;
}
let apple:Goods<string> = {id: 1, title: '苹果', size: 'large'};


function echo<T>(input:T):T {
  // console.log(input.name);
  return input;
}

function echoExtra<T extends {name:string}>(input: T):T {
  console.log(input.name);
  return input
}

// 泛型， 工厂函数
// 如果一个数据是可以实例化的, 我们可以用{new(): any}表示.
function create<T,U>(O:{new(): T|U}):T|U{
  return new O();
}

// 自动推断
let n = 1;
n += 3;

let arr1 = [];
arr1.push(1);
let arr = ["1"];
arr.push('2')

// 浏览器自带api
document.ontouchstart = ev => {
  console.log(ev.touches)
}

// typeof instanceof 类型保护
let nn:number|string = 0.5<Math.random()?1:'1';
if('number' === typeof nn ) {
  nn *= 2
} else {
  nn = '2'
}

let arrNum = 0.5 < Math.random() ? 1 : [1];
// 断言，告诉ts，arrNum为数组
(<number[]>arrNum).push(1);
(arrNum as number[]).push(1);

// 类型别名(type)
type AA = 'top'|'right'|'bottom'|'left'; // 表示值可能是其中的任意一个
let aaa:AA = 'right';
// let aa:AA = 'none';

// 索引类型 keyof
type AAA = keyof { a:1, b:'123'} // 'a'|'b'
type B = keyof [1,2] // '1'|'2'|'push'... , 获取到内容的同时, 还得到了Array原型上的方法和属性(实战中暂时没遇到这种需求, 了解即可

type C = A["a"]; // 等于type C = 1;
let c:C = 2 // 错误, 值只能是1

// 映射类型 Readonly, Pick, Record等
type CC = {a: number, b: string}
// Readonly可以把每个属性都变成只读:
type CC1 = Readonly<CC> // {readonly a: number;readonly b: string;}

// Readonly 实现
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

// Partial<T>, 让属性都变成可选的
type A2  = {a:number, b:string}
type A1 = Partial<A2> // { a?: number; b?: string;}
let ccc:A1 = {b: 'sdfsdf'} ;

// Required<T>, 让属性都变成必选
type A3  = {a?:number, b?:string}
type A4 = Required<A3> // { a: number; b: string;}
let a3:A4 = {a: 1, b:'sdf'}

// Pick<T,K>, 只保留自己选择的属性, U代表属性集合
type A5  = {a:number, b:string}
type A6 = Pick<A5, 'a'> //  {a:number}

// Omit<T,K> 实现排除已选的属性
type A7  = {a:number, b:string}
type A8 = Omit<A7, 'a'> // {b:string}

// Record<K,T>, 创建一个类型,T代表键值的类型, U代表值的类型
type A9 = Record<string, string> // 等价{[k:string]:string}

// Exclude<T,U>, 过滤T中和U相同(或兼容)的类型
type A10  = {a:number, b:string}
type A11 = Exclude<number|string, string|number[]> // number

// 兼容
type A12 = Exclude<number|string, any|number[]> // never , 因为any兼容number, 所以number被过滤掉

// Extract<T,U>, 提取T中和U相同(或兼容)的类型
type A13  = {a:number, b:string}
type A14  = Extract<number|string, string|number[]> // string

// NonNullable, 剔除T中的undefined和null
type A16 = NonNullable<number|string|null|undefined> // number|string

// ReturnType, 获取T的返回值的类型
type A15 = ReturnType<()=>number> // number

// Parameters 获取函数参数类型

interface AAAA{
  (a:number, b:string):string[];
}

type A17 = Parameters<AAAA> // [number, string]

// ConstructorParameters 获取构造函数的参数类型
interface AConstructor{
  new(a:number):string[];
}

type A18 = ConstructorParameters<AConstructor> // [number]

// extends(条件类型)
type A19 =  string extends '123' ? string :'123' // '123'
type A20 =  '123' extends string ? string :123 // string

// infer
export type Tail<Tuple extends any[]> =
 ((...args: Tuple) => void) extends ((a: any, ...args: infer T) => void) ? T : never;

