const menuListEle = document.querySelectorAll(".menu_items");
const tableListEle = document.querySelectorAll(".table_details");

for (let menuItem of menuListEle) {
  menuItem.addEventListener("dragstart", (e) => {
    menuItem.classList.add("hold");
    e.dataTransfer.setData("text", e.target.id);
  });
  menuItem.addEventListener("dragend", (e) => {
    menuItem.classList.remove("hold");
  });
}

for (let table of tableListEle) {
  table.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  table.addEventListener("drop", (e) => {
    let itemid = e.dataTransfer.getData("text");
    addItemToTable(itemid, table.id);
    renderChanges(table, table.id);
  });
}
function renderChanges(table, tableid) {
  table.children[0].children[0].textContent = tables[tableid].totalBill;
  table.children[1].children[0].textContent = tables[tableid].itemCount;
}
function addItemToTable(itemId, tableId) {
  let currTable = tables[tableId];
  currTable.itemCount += 1;
  currTable.totalBill += prices1.get(itemId);
  // currTable.items.push(itemId);
  if (currTable.items[itemId] === undefined) {
    currTable.items[itemId] = 1;
  } else {
    currTable.items[itemId] += 1;
  }
}
