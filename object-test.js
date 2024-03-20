const $library = document.querySelector('.library');
const modalButton = document.querySelector('.new-book');
const modal = document.querySelector('.new-book-modal');
const closeModalButton = document.querySelector('.close-modal');
const $submit = document.getElementById('submit');
const generalImage = './assets/Book-Generic.png';

const myLibrary = [];

function Book(tittle, author, pages, read, image){
  this.tittle = tittle;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.image = image || generalImage;

  this.readBook = function(){
    return this.read === true ? 'it has been read' : 'not read yet';
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
    `<div class="card">
      <h2>${obj.tittle}</h2>
      <img src="${obj.image}" alt="image cover of ${obj.tittle}'s book">
      <div class="book-info">
        <ul>
          <li>${obj.author}</li>
          <li>${obj.pages}</li>
          <li onclick="changeReadStatus()">${obj.read}</li>
        </ul>
      </div>
    </div>`
  )
}

function renderLibrary() {
  myLibrary.forEach(book => {
    const bookToLibrary = createTemplate(card(book));
    $library.append(bookToLibrary);
  })
}

function changeReadStatus() {
  console.log('I totally change the status, trust me bro 👀');
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true, './assets/The-Hobbit.jpg');
const theInfiniteAndTheDivine = new Book('The Infinite and the Divine', 'Robert Rath', 359, false, './assets/The-Infinite-and-The-Divine-cover.png');
const inferno = new Book('Inferno', 'Dan Brown', 480, true, './assets/Dan-Brown-Inferno.png');

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

$submit.addEventListener('click', (event) => {
  event.preventDefault();
})

renderLibrary();