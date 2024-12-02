const formbtn = document.querySelector("form");
const titleBox = document.querySelector("#title");
const authorBox = document.querySelector("#author");
const isbnBox = document.querySelector("#isbn");
const tableBody = document.querySelector("tbody");
const container = document.querySelector(".container");
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
function UI() {}
UI.prototype.addbook = function (book) {
  const list = document.createElement("tr");
  console.log(list);
  list.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
  <td class="delete">x</td>`;
  console.log(list);
  tableBody.appendChild(list);
};
UI.prototype.clearList = function (target) {
  if ((target.className = "delete")) {
    target.parentElement.remove();
  }
};

formbtn.addEventListener("submit", function eventList(e) {
  e.preventDefault();

  const title = titleBox.value;
  const author = authorBox.value;
  const isbn = isbnBox.value;
  const text = document.createElement("p");
  text.classList.add("text");
  console.log(text);
  container.insertBefore(text, formbtn);
  if (title === "" || author === "" || isbn === "") {
    const message = new Messages("Please fill all details!", "red");
    text.textContent = message.err;
    text.style.backgroundColor = message.color;
  } else {
    const book = new Book(title, author, isbn);
    console.log(book);
    const UiMethod = new UI();
    console.log(UiMethod);
    UiMethod.addbook(book);
    const message = new Messages("Book sucessfully added!", "green");
    text.textContent = message.err;
    text.style.backgroundColor = message.color;
    const storage = new Storage();
    storage.addList(book);
  }
  setTimeout(() => {
    text.remove();
  }, 3000);
  titleBox.value = " ";
  authorBox.value = "";
  isbnBox.value = "";
});
tableBody.addEventListener("click", (e) => {
  const UiMethod = new UI();
  UiMethod.clearList(e.target);
  storage.updateDelete(e.target);
});
function Messages(err, color) {
  this.err = err;
  this.color = color;
}

document.addEventListener("DOMContentLoaded", (e) => {
  const storage = new Storage();
  storage.displayList();
});
function Storage() {}
const storage = new Storage();

Storage.prototype.getList = function () {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
};
Storage.prototype.addList = function (book) {
  const books = storage.getList();
  console.log(books);
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
};
Storage.prototype.displayList = function () {
  let books = storage.getList();
  books.forEach((book) => {
    const UiMethod = new UI();
    UiMethod.addbook(book);
  });
};
Storage.prototype.updateDelete = function (target) {
  const books = storage.getList();
  books.forEach((book, index) => {
    if (book.isbn === target.previousElementSibling.textContent) {
      books.splice(index, 1);
    }
    localStorage.setItem("books", JSON.stringify(books));
  });
};
