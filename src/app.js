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

// Listen for delete
document.querySelector('#posts').addEventListener('click',deletePost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click',enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
  const id = document.querySelector('#id').value;
  
  // Send data
  const data = {
    title,
    body // es2015+ syntax จะเหมือนกับ body : 'body' (es5)
  }

  // Validate input
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    if(id === '') {
      // ถ้า id ไม่มีให้ Create Post
      http.post('http://localhost:3000/posts',data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearFields();
          // หลังจาก submit แล้วให้แสดงใน ui
          getPosts();
        })
        .catch(err => console.log(err));
      } else {
        // Update post
        // ถ้ากด edit post enable edit จะรับ ID ไว้
        // หลังจากกด submit จะเข้า if state อันบน
        http.put(`http://localhost:3000/posts/${id}`,data)
          .then(data => {
            ui.showAlert('Post edit', 'alert alert-success');
            ui.changeFormState('add');
            getPosts();
          })
          .catch(err => console.log(err));        
      }  
    }
}

// Delete Post
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    // ? dataset.id ใช้คู่กับ custom data attr ของ HTML5
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// Enable edit state
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    // ต้องการค่า textContent ใน title, body โดยดึงจาก id ที่เรากด edit
    const body = e.target.parentElement.previousElementSibling.textContent;
    // ใช้ Sibling คือพี่น้อง
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    // Fill form with current post ส่งให้ UI
    ui.fillForm(data);
    
  }

  e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}