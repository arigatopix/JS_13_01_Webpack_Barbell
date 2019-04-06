// CommonJS Module ES5
/* 
const person = require('./mymodule1');
console.log(person.name);
 */

//  ES2015 Module
/* 
import { person, sayHello } from './mymodule2';
import greeting from './mymodule2'; // * import without {} ต้องไปใข้ export default ไว้ก่อน
// import * as mod from './mymodule2'; // * import all from module ไปวางไว้ใน mod ตอนเรียกใช้ต้องมี prefix เช่น mod.person.name

console.log(person.name);
console.log(sayHello());
console.log(greeting);
 */

 /////////////////////////////////

 import { http } from './http'
 import { ui } from './ui'

//  Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for add post
document.querySelector('.post-submit').addEventListener('click',submitPost);

// Get Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
  // fetch data from json-server
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit Posts
function submitPost() {
  // get form value
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body // es2015+ syntax จะเหมือนกับ body : 'body' (es5)
  }

  // Create Post
  http.post('http://localhost:3000/posts',data)
    .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      // หลังจาก submit แล้วให้แสดงใน ui
      getPosts();
    })
    .catch(err => console.log(err));

}