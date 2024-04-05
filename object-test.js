const $library = document.querySelector('.library');
const modalButton = document.querySelector('.new-book-icon');
const modal = document.querySelector('.new-book-modal');
const $submit = document.getElementById('submit');
const generalImage = './assets/Book-Generic.png';
const newBookForm = document.getElementById('form');
const closeModalButton = document.querySelector('.close-modal');
const $messageModal = document.getElementById('message');
const $buttonModal = document.querySelector('.modal-accept');

const myLibrary = [];

function Book(title, author, pages, read, image){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read || false;
  this.image = image || generalImage;

  this.readBook = function(){
    return this.read === true ? 'It has been read' : 'Not read yet';
  }

  this.validBookTitle = function() {
    return this.title[0].toUpperCase() + this.title.split('-').join(' ').substring(1);
  }

  this.finishBook = function() {
    this.read = !this.read;
  }

  this.info = function(){
    return `${tittle} by ${author}, ${pages} pages, ${this.readBook()}`
  }
}

const inferno = new Book('inferno', 'Dan Brown', 480, true, './assets/Dan-Brown-Inferno.png');
const theHobbit = new Book('the-hobbit', 'J.R.R. Tolkien', 295, true, './assets/The-Hobbit.jpg');
const theInfiniteAndTheDivine = new Book('the-infinite-and-the-divine', 'Robert Rath', 359, false, './assets/The-Infinite-and-The-Divine-cover.png');

myLibrary.push(theHobbit, theInfiniteAndTheDivine, inferno);

function preventDuplicateBook(book) {
  let result;
  myLibrary.forEach(libraryBook => {
    if(libraryBook.title == book.title){
      alert(`It seems ${book.title} is already in the library`);
      result = true;
    } else if(libraryBook.title == book.title && libraryBook.author == book.author){
      alert(`It seems ${book.title} is already in the library`);
      result = true;
    }else{
      result = false;
    }
  })
  return result
}

function addBookToLibrary(book){
  myLibrary.push(book);
}

function findBookByTitle(title){
  let result
  myLibrary.forEach(book => {
    if(book.title === title){
      book.finishBook();
       result = book.readBook();
    };
  });
  return result;
};

function card(obj){
  return(
    `<div class="card">
      <h2>${obj.validBookTitle()}</h2>
      <img src="${obj.image}" alt="image cover of ${obj.validBookTitle()}'s book">
      <div class="book-info">
        <ul>
          <li>${obj.author}</li>
          <li>${obj.pages}</li>
          <li data-title=${obj.title}>${obj.readBook()}</li>
        </ul>
      </div>
    </div>`
  )
}

function modalBookMessage(){
  return `It seems like the book "${arguments[0]}" is already in the library please check again`
}

function createBook(book){
  return createTemplate(card(book));
}

function renderElement(container, elm) {
  container.append(elm);
}

function renderLibrary() {
  myLibrary.forEach(book => renderElement($library, createBook(book)))
}

function changeReadStatus(e) {
  if(e.target.localName == 'li' && Object.keys(e.target.dataset).length != 0) {
    const target = e.target;
    console.log(e.target.dataset.title);
    target.innerHTML = findBookByTitle(target.dataset.title);
  }
}

function createTemplate(string){
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = string;
  return html.body.children[0];
}

function showModal(title) {
  $messageModal.querySelector('h1').innerHTML = modalBookMessage(title);
  $messageModal.style.transform = 'translateY(0)';
}
function hideModal() {
  $messageModal.style.transform = 'translateY(-1000px)';
}

window.addEventListener('click', (e) => changeReadStatus(e));

modalButton.addEventListener('click', () => {
  modal.style.display = 'block';
})
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
})
$buttonModal.addEventListener('click', () => hideModal())

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.getElementById('title').value.split(' ').join('-');
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let hasBeenRead = document.getElementById('no').value;

  let book = new Book(title, author, pages, hasBeenRead);

  if (preventDuplicateBook(book)){
    showModal(book.title);
    return;
  }
  addBookToLibrary(book);
  renderElement($library, createBook(myLibrary[myLibrary.length-1]));

  console.log(`This is how we looking bud: ${title}, ${author.value}, ${pages.value}, ${hasBeenRead}`)
})

renderLibrary();