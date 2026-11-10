let currentTableIndex;
let multipleRowsIndex;
let deleteTableIndex;
let deleteRowTableIndex;
let deleteRowIndex;
let currentEditingTable;
let currentEditingRow;
let editRowForm = document.getElementById("editrowform");
const deleteTableBtn = document.getElementById("deleteTableBtn");
let rowCount;
let noOfRows=[];
let tables = [];
let table = {
  table_name: "",
  cols_data: [],
  rows_data: [],
};
let col_obj = {
  type: "text",
  name: "",
  isFaulty:false,
  isMandatory:false
};
const add_column_form = document.getElementById("add-column-form");
const create_table_modal_element = document.getElementById("create-table-modal");
const create_table_modal = new bootstrap.Modal(
  create_table_modal_element,
);
const surityModal= new bootstrap.Modal(document.getElementById("suritymodal"));
const rowDeleteModal = new bootstrap.Modal(document.getElementById("rowDeleteModal"));
const create_table_btn = document.getElementById("createtablebtn");
let cols_div = document.getElementById("columns-in-modal");
const multiple_rows = document.getElementById("rows-in-modal");
const addRowModal= new bootstrap.Modal(document.getElementById("addrowmodal"));
const addRowForm = document.getElementById("addrowsform");

let cols = [{ ...col_obj }];

const console_cols = () => {
  console.log(cols);
};

const printCols = () => {
  cols_div.innerHTML = "";
  for (const i in cols) {
    console.log(cols[i].type);
    cols_div.insertAdjacentHTML(
      "beforeend",
      `<div class="flexing d-flex mt-3 gap-4" id="col_${i}" >
                <div class="type-checks d-flex gap-2 align-items-center">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="column_type_${i}" value="text" id="text_radio_${i}" required ${cols[i].type === "text" ? "checked" : ""}>
                                    <label class="form-check-label" for="text_radio_${i}">
                                        Text
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="column_type_${i}" value="number" id="num_radio_${i}" required ${cols[i].type === "number" ? "checked" : ""}>
                                    <label class="form-check-label" for="num_radio_${i}">
                                        Number
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="column_type_${i}" value="boolean" id="bool_radio_${i}" required ${cols[i].type === "boolean" ? "checked" : ""}>
                                    <label class="form-check-label me-5" for="bool_radio_${i}">
                                        Boolean
                                    </label>
                                </div>
                            </div>
                            <div class="column-name">
                                <input type="text" placeholder="COLUMN NAME" class="form-control ${cols[i].isFaulty===true ? "is-invalid" :""}" id="column_name_${i}" value="${cols[i].name}" required>
                            </div>
                            ${cols[i].type !== "boolean" ? `
                            <div class="d-flex flex-column">
                                <input class="form-check-input m-auto" type="checkbox" value="" id="mandatory_${i}" ${cols[i].isMandatory === true ? "checked" : ""}>
                                <label class="form-check-label" for="mandatory_${i}">
                                  isMandatory
                                </label>  
                            </div>
                            ` : ``}
                            <div id="del-column-btn">
                               ${cols.length>1 ? `<button type="button" class="btn btn-danger text-white" id="del_btn_${i}">DELETE</button>`:``} 
                            </div>
                        </div>`,
    );
    const textRadio = document.getElementById(`text_radio_${i}`);
    const numberRadio = document.getElementById(`num_radio_${i}`);
    const booleanRadio = document.getElementById(`bool_radio_${i}`);

    textRadio.addEventListener("change", () => {
      cols[i].type = "text";
      printCols();
      console_cols();
    });

    numberRadio.addEventListener("change", () => {
      cols[i].type = "number";
      printCols();
      console_cols();
    });

    booleanRadio.addEventListener("change", () => {
      cols[i].type = "boolean";
      cols[i].isMandatory = false;
      printCols();
      console_cols();
    });

    if (cols[i].type !== "boolean") {
      const mandatory = document.getElementById(`mandatory_${i}`);

      mandatory.addEventListener("change", () => {
        cols[i].isMandatory = mandatory.checked;
        console_cols();
      });
    }

    const column_name_input = document.getElementById(`column_name_${i}`);
   
    column_name_input.addEventListener("input", () => {
      cols[i].isFaulty=false;
      column_name_input.classList.remove("is-invalid");
      cols[i].name = column_name_input.value;
      console_cols();
    });
    
    const del_col_btn = document.getElementById(`del_btn_${i}`);
    
    if(cols.length>1){
      del_col_btn.addEventListener("click", () => {
        cols = cols.filter(function (col, ind) {
          return ind !== Number(i);
        });
        printCols();
        console_cols();
      });
    }
  }
};
printCols();

let add_column_btn = document.getElementById("add-column-btn");
add_column_btn.addEventListener("click", function () {
  cols.push({ ...col_obj });
  printCols();
  console_cols();
});
console_cols();

const t_name = document.getElementById("add-table-name");
t_name.addEventListener('input',()=>{
  t_name.classList.remove("is-invalid");
})

create_table_modal_element.addEventListener('show.bs.modal', () => {
  cols.forEach((col) => {
    col.isFaulty = false;
  });
  t_name.classList.remove("is-invalid");
  printCols();
});

create_table_modal_element.addEventListener('hide.bs.modal', () => {
  cols.forEach((col) => {
    col.isFaulty = false;
  });
  t_name.classList.remove("is-invalid");
});
create_table_modal_element.addEventListener('hide.bs.modal', () => {
  cols = [{ ...col_obj }];
  t_name.value = "";
  t_name.classList.remove("is-invalid");
  add_column_form.reset();
  printCols();
});
create_table_btn.addEventListener("click", () => {
  if(t_name.value===""){
    t_name.classList.add("is-invalid"); 
  }
  cols.forEach((col)=>{
    if(col.name===""){
      col.isFaulty=true;
    }
  })
   printCols();
  if(!add_column_form.checkValidity()){
    return;
  }
  
  table.table_name = t_name.value;
  table.cols_data = [...cols];
  tables.push({ ...table });

  table = {
    table_name: "",
    cols_data: [],
    rows_data: [],
  };

  cols = [{ ...col_obj }];
  console.log(tables);
  printCols();
  create_table_modal.hide();
  add_column_form.reset();
  display_table();
});

const all_tables_div = document.getElementById("tables");

const createFormRow = (rowId) => {
  let eachrow = document.createElement("div");
  eachrow.className = "d-flex gap-3 pb-3";
  eachrow.id = `row_${multipleRowsIndex}_${rowId}`;

  const selectedTableCols = [...tables[multipleRowsIndex].cols_data];

  for (let i in selectedTableCols) {
    let col = selectedTableCols[i].type;

    if (col == "text") {
      let rowdiv = document.createElement("div");
      rowdiv.className="d-flex flex-column me-3";

      let textinfo =document.createElement("label");
      textinfo.className="ms-2 mb-2 fw-semibold"
      textinfo.innerHTML=`${selectedTableCols[i].name} (${col}) ${selectedTableCols[i].isMandatory ? '<span class="text-danger">*</span>' : ''}`

      let textbox = document.createElement("input");
      textbox.className="form-control";
      textbox.style.width="200px";
      textbox.required = selectedTableCols[i].isMandatory;;
      textbox.id = `text_box_${multipleRowsIndex}_${i}_${rowId}`;
      textbox.addEventListener('input',()=>{
        textbox.classList.remove("is-invalid");
      })
      textbox.setAttribute("type", `${col}`);
      textbox.setAttribute("placeholder", `${selectedTableCols[i].name}`);
      rowdiv.appendChild(textinfo);
      rowdiv.appendChild(textbox);
      eachrow.appendChild(rowdiv);
    }

    if (col == "number") {
      let rowdiv = document.createElement("div");
      rowdiv.className="d-flex flex-column me-3";

      let numinfo =document.createElement("label");
      numinfo.className="ms-2 mb-2 fw-semibold"
      numinfo.innerHTML=`${selectedTableCols[i].name} (${col}) ${selectedTableCols[i].isMandatory ? '<span class="text-danger">*</span>' : ''}`

      let numbox = document.createElement("input");
      numbox.className="form-control";
      numbox.style.width="200px";
      numbox.required =  selectedTableCols[i].isMandatory;
      numbox.addEventListener('input',()=>{
        numbox.classList.remove("is-invalid");
      })
      numbox.id = `num_box_${multipleRowsIndex}_${i}_${rowId}`;
      numbox.setAttribute("type", `${col}`);
      numbox.setAttribute("placeholder", `${selectedTableCols[i].name}`);
      rowdiv.appendChild(numinfo);
      rowdiv.appendChild(numbox);
      eachrow.appendChild(rowdiv);
    }

    if (col == "boolean") {
      let boolbox = document.createElement("div");
      boolbox.className = "d-flex flex-column gap-2 align-items-center justify-content-center me-3";

      let boolcheck = document.createElement("input");
      boolcheck.className = "form-check-input p-0 mx-auto my-0";
      boolcheck.setAttribute("type", "checkbox");
      boolcheck.id = `check_${multipleRowsIndex}_${i}_${rowId}`;
      let boollabel = document.createElement("label");
      boollabel.className = "form-check-label text-center";
      boollabel.setAttribute("for", `check_${multipleRowsIndex}_${i}_${rowId}`);
      boollabel.innerHTML = `${selectedTableCols[i].name}`;

      boolbox.appendChild(boolcheck);
      boolbox.appendChild(boollabel);

      eachrow.appendChild(boolbox);
    }
  }

  let delRowInModal = document.createElement("button");   
  delRowInModal.className="btn btn-danger text-white p-2";
  delRowInModal.innerText="Delete Row";
  delRowInModal.id = `del_row_btn_${multipleRowsIndex}_${rowId}`;

  if(noOfRows.length === 1){
    delRowInModal.style.display = "none";
  }

  delRowInModal.addEventListener('click',()=>{
    const rowToDelete = document.getElementById(`row_${multipleRowsIndex}_${rowId}`);
    multiple_rows.removeChild(rowToDelete);
    noOfRows = noOfRows.filter(id => id !== rowId);

    if(noOfRows.length === 1){
      const firstDelBtn = document.getElementById(`del_row_btn_${multipleRowsIndex}_${noOfRows[0]}`);
      if(firstDelBtn) 
        {firstDelBtn.style.display = "none";}
    }
  });

  eachrow.appendChild(delRowInModal);
  multiple_rows.appendChild(eachrow);

  if(noOfRows.length > 1 && noOfRows[0]){
    const firstDelBtn = document.getElementById(`del_row_btn_${multipleRowsIndex}_${noOfRows[0]}`);
    if(firstDelBtn) firstDelBtn.style.display = "block";
  }
};

const display_table = () => {
  all_tables_div.innerHTML = "";
  tables.forEach(function (table, index) {
    let outercontainer = document.createElement("div");
    outercontainer.className = "border rounded border-success p-3 mb-5";

    let topdiv = document.createElement("div");
    topdiv.className = "d-flex justify-content-between";

    let tablename = document.createElement("h2");
    tablename.className = "text-success fw-bold";
    tablename.innerText = table.table_name;

    let addrowbtn = document.createElement("button");
    addrowbtn.innerText = "ADD ROW";
    addrowbtn.addEventListener("click", function () {
      currentTableIndex = index;
      rowCount=0;
      multipleRowsIndex=index;
      noOfRows=[];
    });
    addrowbtn.setAttribute("data-bs-toggle", "modal");
    addrowbtn.setAttribute("data-bs-target", "#addrowmodal");
    addrowbtn.className = " btn btn-white fw-bold text-success border-success ";

    addrowbtn.addEventListener("click", function () {
      multiple_rows.innerHTML = "";
      rowCount = 0;
      noOfRows = [];

      rowCount++;
      const thisRowId = rowCount;
      noOfRows.push(thisRowId);

      createFormRow(thisRowId);
    });

    topdiv.appendChild(tablename);
    topdiv.appendChild(addrowbtn);
    outercontainer.appendChild(topdiv);

    let eachtable = document.createElement("table");
    eachtable.className = "table";
    let thead = document.createElement("thead");

    let tr = document.createElement("tr");
    table.cols_data.forEach(function (col) {
      let th = document.createElement("th");
      th.setAttribute("scope", "col");
      th.innerText = col.name;
      tr.appendChild(th);
    });
    let th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.innerText = "Actions";
    
    let tbody = document.createElement("tbody");
    table.rows_data.forEach((row,rind)=>{
        let tr = document.createElement("tr");
        table.cols_data.forEach((col,cind)=>{
            let td = document.createElement("td");
            td.innerText = row[col.name];
            tr.appendChild(td);
        })
        let actiondiv = document.createElement("div");
        actiondiv.className="d-flex gap-2"
        let delbtn = document.createElement("button");
        delbtn.className="btn btn-danger text-white";
        delbtn.innerText="DELETE";
        delbtn.setAttribute("data-bs-toggle","modal");
        delbtn.setAttribute("data-bs-target","#rowDeleteModal");
        delbtn.addEventListener('click',()=>{
            deleteRowTableIndex = index;
            deleteRowIndex = rind;
        })

        let editbtn = document.createElement("button");
        editbtn.className="btn btn-warning text-white";
        editbtn.innerText="EDIT";
        editbtn.setAttribute("data-bs-toggle","modal");
        editbtn.setAttribute("data-bs-target","#rowEditModal");
        editbtn.addEventListener('click',()=>{

            currentEditingTable = index;
            currentEditingRow = rind;
            editRowForm.innerHTML= "";
            table.cols_data.forEach((col, cind) => {
        if (col.type === "text") {
            let rowdiv = document.createElement("div");
             rowdiv.className="d-flex flex-column";

             let textinfo =document.createElement("label");
             textinfo.className="ms-2 mb-2 fw-semibold"
            //  textinfo.innerText=`${col.name} (${col.type})`
            textinfo.innerHTML=`${col.name} (${col.type}) ${col.isMandatory ? '<span class="text-danger">*</span>' : ''}`

            let textbox = document.createElement("input");
            textbox.type = "text";
            textbox.style.width="200px"
            textbox.required = col.isMandatory;;

            textbox.addEventListener('input',()=>{
            textbox.classList.remove("is-invalid");
          })
            textbox.className = "form-control mb-2";
            textbox.id = `edit_text_${cind}`;
            textbox.placeholder = col.name;
            textbox.value = row[col.name];

            rowdiv.appendChild(textinfo);
            rowdiv.appendChild(textbox);
           editRowForm.appendChild(rowdiv);
        }
        if (col.type === "number") {
           let rowdiv = document.createElement("div");
             rowdiv.className="d-flex flex-column";

             let numinfo =document.createElement("label");
             numinfo.className="ms-2 mb-2 fw-semibold"
            //  numinfo.innerText=`${col.name} (${col.type})`
            numinfo.innerHTML=`${col.name} (${col.type}) ${col.isMandatory ? '<span class="text-danger">*</span>' : ''}`

            let numbox = document.createElement("input");
            numbox.type = "number";
            numbox.style.width="200px"
            numbox.required = col.isMandatory;;

            numbox.className = "form-control mb-2";
            numbox.addEventListener('input',()=>{
            numbox.classList.remove("is-invalid");
          })
            numbox.id = `edit_num_${cind}`;
            numbox.placeholder = col.name;
            numbox.value = row[col.name];
            rowdiv.appendChild(numinfo);
            rowdiv.appendChild(numbox);
            editRowForm.appendChild(rowdiv);
        }
        if (col.type === "boolean") {
            let boolbox = document.createElement("div");
            boolbox.className = "form-check mb-2";

            let boolcheck = document.createElement("input");
            boolcheck.type = "checkbox";

            boolcheck.className = "form-check-input";
            boolcheck.id = `edit_check_${cind}`;
            boolcheck.checked = row[col.name];
            

            let boollabel = document.createElement("label");
            boollabel.className = "form-check-label";
            boollabel.setAttribute("for", `edit_check_${cind}`);
            // boollabel.innerText = col.name;
            boollabel.innerHTML = `${col.name}`;

            boolbox.appendChild(boolcheck);
            boolbox.appendChild(boollabel);
            editRowForm.appendChild(boolbox);
        }
         });
            
        })
        actiondiv.appendChild(editbtn);
        actiondiv.appendChild(delbtn);
         let td = document.createElement("td");
         td.appendChild(actiondiv);
         tr.appendChild(td);
        tbody.appendChild(tr);
    })

    tr.appendChild(th);
    thead.appendChild(tr);
    eachtable.appendChild(thead);
    eachtable.appendChild(tbody);
    
    outercontainer.appendChild(eachtable);

    let deleteTable = document.createElement("button"); 
    let deleteDiv = document.createElement("div"); 
    deleteTable.className="btn btn-danger text-white d-block m-auto";
    deleteTable.innerText="DELETE TABLE";
    deleteTable.setAttribute("data-bs-toggle","modal");
    deleteTable.setAttribute("data-bs-target","#suritymodal")
    let tabledelname= document.getElementById("tablenameconfirm")
    tabledelname.innerText=`${table.table_name}`
    deleteDiv.appendChild(deleteTable);
    outercontainer.appendChild(deleteDiv);
    deleteTable.addEventListener('click',()=>{
        deleteTableIndex=index;
    })

    all_tables_div.appendChild(outercontainer);
  });
};

const create_row_btn = document.getElementById("create-row");

create_row_btn.addEventListener("click", function () {
    const allInputs = multiple_rows.querySelectorAll("input");
    let isValid = true;

    allInputs.forEach(input => {
      if(input.required){
      if (input.type === "text" || input.type === "number") {
        if (input.value === "") {
          input.classList.add("is-invalid");
          isValid = false;
        }
      }
      }
    });

    if (!isValid || !addRowForm.checkValidity()) {
      return;
    }

    noOfRows.forEach((rowId) => {
        let row = {};
        const selectedTableCols = [...tables[currentTableIndex].cols_data];
        selectedTableCols.forEach((selectedColData, selectedColIndex) => {
            let value = "";
            
            if (selectedColData.type === "text") {
              value = document.getElementById(`text_box_${currentTableIndex}_${selectedColIndex}_${rowId}`).value;
              row[selectedColData.name] = value;
            }
            if (selectedColData.type === "number") {
              value = Number(document.getElementById(`num_box_${currentTableIndex}_${selectedColIndex}_${rowId}`).value);
              row[selectedColData.name] = value;
            }
            if (selectedColData.type === "boolean") {
              value = document.getElementById(`check_${currentTableIndex}_${selectedColIndex}_${rowId}`).checked;
              row[selectedColData.name] = value;
            }
            
            console.log(tables[currentTableIndex]);
        });
        tables[currentTableIndex].rows_data.push(row);
    });
  console_cols();
  console.log(tables);
  display_table();
  addRowForm.reset();
  addRowModal.hide();
});

const multipleRowsBtn = document.getElementById("multiplerowsbtn");
multipleRowsBtn.addEventListener('click',()=>{
    rowCount++;
    const thisRowId = rowCount;
    console.log(thisRowId);
    noOfRows.push(thisRowId);

    createFormRow(thisRowId);
});

const saverowedit = document.getElementById("saverowedit");
let editmodal=new bootstrap.Modal(document.getElementById("rowEditModal"));
saverowedit.addEventListener('click', () => {
    const editTable = tables[currentEditingTable];
    let isValid = true;

    editTable.cols_data.forEach((col, cind) => {
        if(col.isMandatory){
            if(col.type === "text"){
                const textbox = document.getElementById(`edit_text_${cind}`);

                if(textbox.value === ""){
                    textbox.classList.add("is-invalid");
                    isValid = false;
                }
            }

            if(col.type === "number"){
                const numbox = document.getElementById(`edit_num_${cind}`);

                if(numbox.value === ""){
                    numbox.classList.add("is-invalid");
                    isValid = false;
                }
            }
        }
    });

    if(!isValid){
        return;
    }

    const editRow = editTable.rows_data[currentEditingRow];

    editTable.cols_data.forEach((col, cind) => {
        if (col.type === "text") {
            editRow[col.name] = document.getElementById(`edit_text_${cind}`).value;
        }
        if (col.type === "number") {
            editRow[col.name] = Number(document.getElementById(`edit_num_${cind}`).value);
        }
        if (col.type === "boolean") {
            editRow[col.name] = document.getElementById(`edit_check_${cind}`).checked;
        }
    });

    display_table();
    
    editmodal.hide();
    editRowForm.innerHTML="";
});

deleteTableBtn.addEventListener('click',()=>{
    tables=tables.filter((table,tind)=>{
        return tind != deleteTableIndex;
    })
    display_table();
    surityModal.hide();
});

const deleteRowBtn = document.getElementById("deleteRowBtn");
deleteRowBtn.addEventListener('click',()=>{
    tables[deleteRowTableIndex].rows_data = tables[deleteRowTableIndex].rows_data.filter(function (row, ind) {
        return ind !== deleteRowIndex;
    });
    display_table();
    rowDeleteModal.hide();
});