// ES2015 Module
export const person = {
  name : 'John',
  age : 39
}

export function sayHello() {
  return `Hello ${person.name}`;
  // ${person.name} module เดียวกัน สามารถเอาไปใช้ข้างนอกได้โดยไม่ต้อง export
}

const greeting = 'Hello World';
export default greeting;