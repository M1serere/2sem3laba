//сортировочка
//let a = true;

document.addEventListener("DOMContentLoaded", function() {
    setSortSelects(information, document.getElementById("sorter"));

    let sort1 = document.getElementById("sort1");
    let sort2 = document.getElementById("sort2");
    let sort3 = document.getElementById("sort3");

    sort1.onchange = () => {
        changeNextSelect(sort2, sort1);
        sort3.disabled ||= sort2.disabled;
    }
    sort2.onchange = () => {
        changeNextSelect(sort3, sort2);
    }

    document.getElementById("sort").onclick = () => {
        sortTable("ttab", document.getElementById("sorter"));
        //a = false;
    }

    document.getElementById("clear-sort").onclick = () => {
        sort1.value = 0;
        sort1.onchange();
        //filterTable(information, "ttab", document.getElementById("sorter"));
        clearTable('ttab');
        createTable(information, 'ttab');
        //a == true;
    }
});

//стокгольмский синдром
//на небе только и разговоров, что о море

let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}
   
let setSortSelect = (head, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    for (let i in head) sortSelect.append(createOption(head[i], Number(i) + 1));
}

let setSortSelects = (data, dataForm) => {
    let head = Object.keys(data[0]);
    let allSelect = dataForm.getElementsByTagName('select');
    for(let j = 0; j < allSelect.length; j++) {
        setSortSelect(head, allSelect[j]);
        if (j > 0) allSelect[j].disabled= true;
    }
}

let changeNextSelect = (nextSelect, curSelect) => {
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value != 0) {
        for (let i = 0; i < nextSelect.options.length; ++i) {
            if (nextSelect.options[i].value == curSelect.value) nextSelect.remove(i);
        }
    } else {
        nextSelect.disabled = true;
    }
}

let createSortArr = (dataForm) => {
    let sortArr = [];
    let sortSelects = dataForm.getElementsByTagName('select');
    for (let i = 0; i < sortSelects.length; i++) {
        let keySort = sortSelects[i].value;
        if (keySort == 0) break;
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push({column: keySort - 1, order: desc});
    }
    return sortArr;
};

let sortTable = (idTable, dataForm) => {
    let sortArr = createSortArr(dataForm);
    if (sortArr.length === 0) return;
    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    rowData.shift();
    //if (a) {
        rowData.sort((first, second) => {
            for(let i in sortArr) {
                let key = sortArr[i].column;
                let item1 = first.cells[key].innerHTML;
                let item2 = second.cells[key].innerHTML;
                let numItem1 = Number(item1);
                let numItem2 = Number(item2);
                if ((isNaN(numItem1) ? item1 : numItem1) > (isNaN(numItem2) ? item2 : numItem2)) {
                    return sortArr[i].order ? -1 : 1;
                } else if ((isNaN(numItem1) ? item1 : numItem1) < (isNaN(numItem2) ? item2 : numItem2)) {
                    return sortArr[i].order ? 1 : -1;
                }
                //a = false;
            }
            return 0;
            
        });
        
    //}
    

    rowData.forEach(item => {
        table.append(item);
    });
}
   