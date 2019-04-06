// CommonJS Module ES5
/* 
const person = require('./mymodule1');
console.log(person.name);
 */

//  ES2015 Module
import { person, sayHello } from './mymodule2';
import greeting from './mymodule2';

// * import all from module ไปวางไว้ใน mod ตอนเรียกใช้ต้องมี prefix เช่น mod.person.name
// import * as mod from './mymodule2';

console.log(person.name);
console.log(sayHello());

// * import without {} ต้องไปใข้ export default ไว้ก่อน
console.log(greeting);