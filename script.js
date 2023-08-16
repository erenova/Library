const bookLibrary = [];

function Book(author, name, totalPage, state = false) {
  this.author = author;
  this.name = name;
  this.totalPage = totalPage;
  this.state = state;
}

function pushNewBook(valAuthor, valName, valPage, valState = false) {
  bookLibrary.push(new Book(valAuthor, valName, valPage, valState));
  domFunctions.renderDom();
}

function addNewBook() {}

const currentSession = {};
const userSettings = {};

const domSelectors = {
  topbar: "#topbar",
  sidebar: "#sidebar",
  contentBooks: "#contentBooks",
  backdrop: "#backdrop",
  menuButton: "#menuButton",
  sidebarClose: "#sidebarClose",
  bookNameInp: "#bookName",
  authorInp: "#author",
  pageNumberInp: "#pageNumber",
  alreadyReadInp: "#alreadyRead",
  notReadInp: "#notReadYet",
  newBookButton: "#NewBookButton",
};

const domItem = {};

for (const key in domSelectors) {
  domItem[key] = document.querySelector(domSelectors[key]);
}
const domItemsAll = {
  stateItems: document.querySelectorAll("[data-state]"),
  inputElements: [
    domItem.bookNameInp,
    domItem.authorInp,
    domItem.pageNumberInp,
  ],
  buttonRead: document.querySelectorAll('[data-button="read"]'),
  buttonDelete: document.querySelectorAll('[data-button="delete"]'),
  buttonEdit: document.querySelectorAll('[data-button="edit"]'),
};
const domFunctions = {
  switchState(item) {
    item.dataset.state =
      item.dataset.state === "deactive" ? "active" : "deactive";
  },
  deactiveAll() {
    domItemsAll.stateItems.forEach((item) => {
      item.dataset.state = "deactive";
    });
  },
  activateItem(...arg) {
    arg.forEach((item) => {
      item.dataset.state = "active";
    });
  },
  renderDom() {
    let itemIndex = 0;
    domItem.contentBooks.innerHTML = "";
    if (bookLibrary === []) {
      domItem.contentBooks.innerHTML = "";
      return;
    }
    bookLibrary.forEach((bookItem) => {
      let readState = bookItem.state === true ? "Read" : "Unread";
      let newBook = document.createElement("div");
      newBook.classList.add("book");
      newBook.dataset.bookIndex = itemIndex;
      newBook.innerHTML = `\n                    
      <div class="book-author">${bookItem.author}</div>\n                    
      <div class="book-name">${bookItem.name}</div>\n                    
      <div class="book-read-state">${readState}</div>\n                    
      <div class="book-page-number">${bookItem.totalPage} Pages</div>\n                    
      <div class="book-buttons">\n                        
      <div class="book-read book-button" data-button="read" data-read-index="${itemIndex}" data-read-state="${bookItem.state}">\n                            <button type="button">\n                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                                    <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>\n                                </svg>\n                            </button>\n                        </div>\n                        
      <div class="book-delete-button book-button" data-button="delete" data-delete-index="${itemIndex}">\n                            <button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>\n                                </svg></button>\n                        </div>\n                        
      <div class="book-edit-button book-button" data-button="edit" data-edit-index="${itemIndex}">\n                            <button type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n                                    <path d="M19.39 10.74L11 19.13V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z"></path>\n                                </svg></button>\n                        </div>\n                    </div>\n                `;
      domItem.contentBooks.appendChild(newBook);
      domItemsAll.buttonRead = document.querySelectorAll(
        '[data-button="read"]'
      );
      domItemsAll.buttonDelete = document.querySelectorAll(
        '[data-button="delete"]'
      );
      domItemsAll.buttonEdit = document.querySelectorAll(
        '[data-button="edit"]'
      );
      domItemsAll.buttonRead.forEach((elem) => {
        elem.addEventListener("click", () => {
          let readIndex = elem.dataset.readIndex;
          domFunctions.changeReadState(readIndex);
          domFunctions.renderDom();
        });
      });

      itemIndex++;
    });
  },
  handleSidebar() {
    if (domItem.sidebar.dataset.state === "deactive") {
      domItem.sidebar.style.display = "none";
    }
  },
  bookScroll() {
    var element = domItem.contentBooks;
    var to = element.scrollHeight;

    element.scroll({
      top: to,
      behavior: "smooth",
    });
  },
  clearInputs() {
    domItem.bookNameInp.value = "";
    domItem.authorInp.value = "";
    domItem.pageNumberInp.value = "";
    domItem.alreadyReadInp.checked = false;
    domItem.notReadInp.checked = true;
  },
  changeReadState(indexNumber) {
    let activeItem = document.querySelector(
      `[data-read-index="${indexNumber}"]`
    );
    bookLibrary[indexNumber].state =
      bookLibrary[indexNumber].state === true ? false : true;
    activeItem.dataset.readState = bookLibrary[indexNumber].state;
    domFunctions.renderDom();
  },
  deleteBook(indexNumber) {
    bookLibrary.splice(indexNumber, 1);
    domFunctions.renderDom();
  },
  editBook(indexNumber) {},
};

domItem.backdrop.addEventListener("click", () => {
  domFunctions.deactiveAll();
});
domItem.menuButton.addEventListener("click", () => {
  domItem.sidebar.style.display = "block";
  requestAnimationFrame(() => {
    domFunctions.switchState(domItem.backdrop);
    domFunctions.switchState(domItem.sidebar);
  });
});
domItem.sidebarClose.addEventListener("click", () => {
  domFunctions.deactiveAll();
});

domItem.sidebar.addEventListener("transitionend", domFunctions.handleSidebar);

domItem.newBookButton.addEventListener("click", () => {
  const firstEmptyInput = domItemsAll.inputElements.find(
    (input) => input.value === ""
  );
  if (firstEmptyInput) {
    firstEmptyInput.focus();
    return;
  }

  let isRead = domItem.alreadyReadInp.checked === true ? true : false;
  pushNewBook(
    domItem.bookNameInp.value,
    domItem.authorInp.value,
    domItem.pageNumberInp.value,
    isRead
  );
  domFunctions.clearInputs();
  domFunctions.deactiveAll();
  domFunctions.bookScroll();
});

pushNewBook("eren", "eren", 33, true);
