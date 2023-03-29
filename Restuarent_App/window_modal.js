const tableSearchEle = document.querySelector("#tablesearch");
const menuSearchEle = document.querySelector("#menusearch");

tableSearchEle.addEventListener("keyup", function () {
  let input = tableSearchEle.value;
  input = input.toLowerCase(input);
  let allTableItems = document.querySelectorAll(".table-item");
  for (let item of allTableItems) {
    let itemData = item.textContent;
    itemData = itemData.toLowerCase();
    if (itemData.includes(input)) {
      item.style.display = "initial";
    } else {
      item.style.display = "none";
    }
  }
});

menuSearchEle.addEventListener("keyup", function () {
  let input = menuSearchEle.value;
  input = input.toLowerCase(input);
  let allMenuItems = document.querySelectorAll(".menu_items");
  for (let item of allMenuItems) {
    let itemData = item.textContent;
    let itemData1 = item.className;
    itemData1 = itemData1.toLowerCase();
    itemData = itemData.toLowerCase();
    if (itemData.includes(input) | itemData1.includes(input)) {
      console.log(itemData);
      item.style.display = "initial";
    } else {
      item.style.display = "none";
    }
  }
});

("use strict");
const allTables = document.querySelectorAll(".table-item");
const overlayEle = document.querySelector(".overlay");
const modalEle = document.querySelector(".modal");
const modalContainerEle = document.querySelector(".modal-container");

for (let tableMonitoring of allTables) {
  tableMonitoring.addEventListener("click", () => {
    let tableId = tableMonitoring.children[1].id;
    displayModal(tableId);
  });
}
const closeModalEle = document.querySelector(".close-modal");
closeModalEle.addEventListener("click", closeTheModal);
function closeTheModal() {
  {
    modalEle.classList.add("hide");
    overlayEle.classList.add("hide");
  }
}

function displayModal(tableId) {
  modalEle.classList.remove("hide");
  overlayEle.classList.remove("hide");
  let currTable = tables[tableId];
  let i = 1;
  const head = `  <tr >
                    <th>S.no</th>
                    <th>Item Name</th>
                    <th>Servings</th>
                    <th>Price</th>
                    <th>Drop the item</th>
                    <th style="display:none"></th>
                </tr>`;
  modalContainerEle.innerHTML = head;
  for (const [key, value] of Object.entries(currTable.items)) {
    let serno = i++;
    let item = key;
    var price = prices1.get(item);
    let servings = value;

    const html = `<tr class="temp temp-${tableId}">
                        <td>${serno}</td>
                        <td>${item}</td>
                        <td><input style="background-color:white;"class="servings-${tableId}" id="${key}" type="number" value="${servings}" min=0></td>
                        <td class="price">${price}</td>
                        <td><button style=" color:grey;" class="dropItem" id="${key}-${tableId}"><i class="fa fa-trash"></i></button></td>              
                    </tr>`;
    modalContainerEle.innerHTML += html;
  }
  modalContainerEle.innerHTML += `<button class="bill" > GenerateBill</button>`;

  const inputEles = modalContainerEle.querySelectorAll(`.servings-${tableId}`);
  inputEles.forEach((inputEle) => {
    inputEle.addEventListener("change", () => {
      const serving = inputEle.value;
      const itemName = inputEle.id;
      const pricePerServing = prices1.get(itemName);
      const priceEle = inputEle.closest("tr").querySelector(".price");
      priceEle.textContent = pricePerServing * serving;
    });
  });

  const allServings = document.querySelectorAll(`.servings-${tableId}`);
  for (let serving of allServings) {
    serving.addEventListener("click", () => modifyServings(tableId, serving));
  }
  //drop the items
  const droppedItems = document.querySelectorAll(".dropItem");
  for (let item of droppedItems) {
    item.addEventListener("click", () => dropTheItem(item));
  }

  const billButton = document.querySelector(".bill");
  billButton.classList.remove("hide");
  billButton.addEventListener("click", () =>
    generateTheBill(currTable, tableId, billButton)
  );
}

function modifyServings(tableId, serving) {
  let itemId = serving.id;
  let prev = tables[tableId].items[itemId];
  let newval = serving.value;
  tables[tableId].items[itemId] = newval;
  tables[tableId].itemCount += newval - prev;
  tables[tableId].totalBill += (newval - prev) * prices1.get(itemId);
  const table = document.getElementById(`${tableId}`);
  renderChanges(table, tableId);
}
function dropTheItem(item) {
  //console.log();
  const [itemId, tableId] = item.id.split("-");
  let reduceItems = tables[tableId].items[itemId];
  tables[tableId].itemCount -= reduceItems;
  tables[tableId].totalBill -= prices1.get(itemId) * reduceItems;
  delete tables[tableId].items[itemId];
  closeTheModal();
  const table = document.getElementById(`${tableId}`);
  renderChanges(table, tableId);
  displayModal(tableId);
}

function generateTheBill(currTable, tableId, billButton) {
  const head = `  <tr >
                    <th>S.no</th>
                    <th>Item Name</th>
                    <th>Servings</th>
                    <th>Price</th>
                    <th style="display:none"></th>
                </tr>`;
  modalContainerEle.innerHTML = head;
  const html = `<tr class="temp temp-${tableId}">
                    <td colspan="2">Total items and the price</td>
                    <td>${currTable.itemCount}</td>
                    <td>${currTable.totalBill}</td>                                                    
                </tr>`;
  modalContainerEle.innerHTML += html;
  billButton.classList.add("hide");
  setTimeout(function () {
    currTable.items = {};
    currTable.itemCount = 0;
    currTable.totalBill = 0;
    const table = document.getElementById(`${tableId}`);
    renderChanges(table, tableId);
  }, 1000);
}
