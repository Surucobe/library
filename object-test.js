const $library = document.querySelector('.library');
const modalButton = document.querySelector('.new-book-icon');
const modal = document.querySelector('.new-book-modal');
const closeModalButton = document.querySelector('.close-modal');
const $submit = document.getElementById('submit');
const generalImage = './assets/Book-Generic.png';
const newBookForm = document.getElementById('form');


const myLibrary = [];

function Book(title, author, pages, read, image){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

function addBookToLibrary(book){
  myLibrary.push(book);
}

//TODO: Buscar agregar un onclick al elemto read para cambiar el estado de leido a no leido
function card(obj){
  return(
    `<div class="card" data-title=${obj.title}>
      <h2>${obj.validBookTitle()}</h2>
      <img src="${obj.image}" alt="image cover of ${obj.validBookTitle()}'s book">
      <div class="book-info">
        <ul>
          <li>${obj.author}</li>
          <li>${obj.pages}</li>
          <li onclick="changeReadStatus()">${obj.readBook()}</li>
        </ul>
      </div>
    </div>`
  )
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
  console.log(e)
  console.log('I totally change the status, trust me bro 👀');
}

const theHobbit = new Book('the-hobbit', 'J.R.R. Tolkien', 295, true, './assets/The-Hobbit.jpg');
const theInfiniteAndTheDivine = new Book('the-infinite-and-the-divine', 'Robert Rath', 359, false, './assets/The-Infinite-and-The-Divine-cover.png');
const inferno = new Book('inferno', 'Dan Brown', 480, true, './assets/Dan-Brown-Inferno.png');

myLibrary.push(theHobbit);
myLibrary.push(theInfiniteAndTheDivine);
myLibrary.push(inferno);

function createTemplate(string){
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = string;
  return html.body.children[0];
}

modalButton.addEventListener('click', () => {
  modal.style.display = 'block';
})
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
})

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let hasBeenRead = document.getElementById('no').value;

  addBookToLibrary(new Book(title, author, pages, hasBeenRead));
  renderElement($library, createBook(myLibrary[myLibrary.length-1]));

  console.log(`This is how we looking bud ${title}, ${author.value}, ${pages.value}, ${hasBeenRead}`)
})

renderLibrary();