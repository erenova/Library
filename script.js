const domItems = {
  topbar: document.querySelector("#topbar"),
  sidebar: document.querySelector("#sidebar"),
  backdrop: document.querySelector("#backdrop"),
  menuButton: document.querySelector("#menuButton"),
  sidebarButton: document.querySelector("#sidebarButton"),
};

const domFunctions = {
  switchState(domItem) {
    domItem.dataset.state =
      domItem.dataset.state === "deactive" ? "active" : "deactive";
  },
};

domItems.backdrop.addEventListener("click", () => {
  domFunctions.switchState(domItems.backdrop);
  domFunctions.switchState(domItems.sidebar);
});
domItems.menuButton.addEventListener("click", () => {
  domFunctions.switchState(domItems.backdrop);
  domFunctions.switchState(domItems.sidebar);
});
domItems.sidebarButton.addEventListener("click", () => {
  domFunctions.switchState(domItems.backdrop);
  domFunctions.switchState(domItems.sidebar);
});
