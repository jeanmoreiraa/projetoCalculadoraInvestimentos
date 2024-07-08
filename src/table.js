const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new console.error(
      "Para execulção, precisamos de um array com as colunas, outro com as informações das linhas e também o ide do elemento dabela selecionado"
    );
  }
  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new error("Id iformado não corresponde a nenhum elemento table");
  }
  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createtheadElement(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }
  const tableHeaderReference =
    tableReference.querySelector("thead") ?? createtheadElement(tableReference);
  const headerRow = document.createElement("tr");
  ["bg-blue-900", "text-slate-200", "sticky", "top-0"].forEach((cssclass) =>
    headerRow.classList.add(cssclass)
  );
  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/ `<th class="text-center">${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tablebodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement("tr");
    if (itemIndex % 2 !== 0) {
      tableRow.classList.edd("bg-blue-200");
    }
    for (const tablecolumn of columnsArray) {
      const formatFn = tablecolumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html*/ `<td class="text-center">${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }
    tablebodyReference.appendChild(tableRow);
  }
}
