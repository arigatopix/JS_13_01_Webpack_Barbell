class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add'; //default state
  }

  // Show all post
  showPosts(posts){
    // เอาไปแสดงผล รับค่าจาก app.js (http.get)
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil-alt"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
      `;
    });
    // data-id เป็น custom attribut ที่ html5 สามารถทำได้
    // ! โง่ ลืมดู "" ที่ class
    this.post.innerHTML = output;
  }

  // Show alert
  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    // add className
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // get the parent
    const container = document.querySelector('.postContainer');
    // Get posts
    const posts = document.querySelector('#posts');
    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    },3000);
  }

  // Cleart div alert
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if(currentAlert) {
      // ถ้ามี class 'alert' อยู่แล้วหนึ่งอัน อันอื่นๆ จะถูกลบ
      currentAlert.remove();
    }
  }

  // Clear all field after Submit
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // Fill form to edit
  fillForm(data){
    // * อย่าลืม .value นะเพราะรับมาจาก DOM
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id; // ที่ hidden ไว้ เพื่อบรรจุ id หลังจาก submit จะได้ส่ง id ปัจจุบันเข้าไปใน backend
    
    // State listen
    this.changeFormState('edit');
  }
  
  clearIdInput() {
    // * อย่าลืม .value นะเพราะรับมาจาก DOM
    this.idInput.value = '';
  }

  // Change the form State
  changeFormState(type) {
    if(type === 'edit') {
      // เปลี่ยน text ในปุ่ม และเปลี่ยนสี
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));
      
      // Get parent 
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');

      // แสดง button แค่อันเดียว
      const buttonArr = Array.from(document.querySelectorAll('.post-cancel'))
      if(buttonArr.length === 0) {
        // Insert before (cancel button)
        cardForm.insertBefore(button, formEnd);
      }

    } else {
      this.postSubmit.textContent = 'Post It!';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      
      // Remove cancel btn if it is there เอาปุ่ม cancel ออกถ้าเป้นปกติ
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      // Clear ID from hidden field
      this.clearIdInput();
      // Clear Test
      this.clearFields()
    }
  }
}

export const ui = new UI();