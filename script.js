const bookLibrary = [];

function Book(name, author, totalPage, state = false) {
  this.name = name;
  this.author = author;
  this.totalPage = totalPage;
  this.state = state;
}

function addBookToLibrary(bookObject) {
  return new Book(bookObject);
}

const currentSession = {};
const userSettings = {};

const domItem = {
  topbar: document.querySelector("#topbar"),
  sidebar: document.querySelector("#sidebar"),
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
};

domItem.backdrop.addEventListener("click", () => {
  domFunctions.deactiveAll();
});
domItem.menuButton.addEventListener("click", () => {
  domFunctions.switchState(domItem.backdrop);
  domFunctions.switchState(domItem.sidebar);
});
domItem.sidebarClose.addEventListener("click", () => {
  domFunctions.deactiveAll();
});
