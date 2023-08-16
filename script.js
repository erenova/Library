const bookLibrary = [];

function Book(name, author, totalPage, state = false) {
  this.name = name;
  this.author = author;
  this.totalPage = totalPage;
  this.state = state;
}

function addNewBook(valName, valAuthor, valPage, valState = false) {
  bookLibrary.push(new Book(valName, valAuthor, valPage, valState));
}

const currentSession = {};
const userSettings = {};

const domItem = {
  topbar: document.querySelector("#topbar"),
  sidebar: document.querySelector("#sidebar"),
  contentBooks: document.querySelector("#contentBooks"),
  backdrop: document.querySelector("#backdrop"),
  menuButton: document.querySelector("#menuButton"),
  sidebarClose: document.querySelector("#sidebarClose"),
};
const domItemsAll = {
  stateItems: document.querySelectorAll("[data-state]"),
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
    bookLibrary.forEach((bookItem) => {
      bookItem;
    });
  },
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

domItem.sidebar.addEventListener("transitionend", () => {
  if (domItem.sidebar.dataset.state === "deactive") {
    domItem.sidebar.style.display = "none";
  }
});
