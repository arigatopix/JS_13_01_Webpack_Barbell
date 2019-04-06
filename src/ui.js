class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add'; //default state
  }

  showPosts(posts){
    // เอาไปแสดงผล รับค่าจาก app.js (http.get)
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link data-id="${post.id}">
              <i class="fa fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link data-id="${post.id}">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
      `;
    });
    // data-id เป็น custom attribut ที่ html5 สามารถทำได้
    this.post.innerHTML = output;
  }
  
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

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if(currentAlert) {
      // ถ้ามี class 'alert' อยู่แล้วหนึ่งอัน อันอื่นๆ จะถูกลบ
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();