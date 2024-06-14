//фильтрики
//заполнение таблицы информацией из data
document.addEventListener("DOMContentLoaded", function () {
    createTable(information, 'ttab');
})

//выводим таблицу на страницу
let createTable = (data, idTable) => {
    // находим таблицу
    let table = document.getElementById(idTable);
    table.id = "ttab";
    // формируем заголовочную строку из ключей нулевого элемента массива
    let tr = document.createElement('tr');
    for (let key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);
    // самостоятельно сформировать строки таблицы на основе массива data
    data.forEach((item) => {
        // создать новую строку таблицы tr
        let tr = document.createElement("tr");
        // перебрать ключи очередного элемента массива
        for (let key in item) {
            let td = document.createElement('td');
            td.innerText = item[key];
            tr.append(td);
        }
        // создать элемент td
        // занести в него соответствующее значение из массива
        // добавить элемент td к строке
        // строку добавить в таблицу
        table.append(tr);
    });
    
}

//думаешь мы действительно будем сидеть на облаке и говорить о море? да, я твёрдо в это верю

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
    table.innerHTML = "";
}

// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Номер": "number",
    "Название": "nametown",
    "Тип климата": "climate",
    "Часть страны": "country",
    "Год": ["yearFrom", "yearTo"],
    "Время года": "season",
    "Температура(°)": ["tempFrom", "tempTo"],
    "Осадки(мм)": ["falloutFrom", "falloutTo"]
}

let dataFilter = (dataForm) => {

    let dictFilter = {};
    // перебираем все элементы формы с фильтрами

    for (let j = 0; j < dataForm.elements.length; j++) {
        // выделяем очередной элемент формы
        let item = dataForm.elements[j];

        // получаем значение элемента
        let valInput = item.value;
        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } else if (item.value != "") {
            valInput = Number(valInput);
        } else if (item.id.indexOf("From") != -1) {
            item.value = item.min;
            valInput = Number(item.min);
            //valInput = -20;
        } else if (item.id.indexOf("To") != -1) {
            item.value = item.max;
            valInput = Number(item.max);
            //valInput = 400;
        }
        /* самостоятельно обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From - занести в valInput
        -бесконечность
        - если поле пусто и его id включает To - занести в valInput
        +бесконечность
        */
        // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
}

let filterTable = (data, idTable, dataForm) => {

    // получаем данные из полей формы
    //console.log(dataFilter(dataForm));
    let datafilter = dataFilter(dataForm);

    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        let result = true;

        // строка соответствует фильтру, если сравнение всех значения из input
        // со значением ячейки очередной строки - истина
        for (let key in item) {

            if (correspond[key] == "number") continue;

            let val = item[key];

            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                val = item[key].toLowerCase()
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1
            }
            // самостоятельно проверить числовые поля на принадлежность интервалу
            else {
                val = Number(val);
                //console.log(val);
                //console.log(datafilter[correspond[key][0]]);
                //console.log(datafilter[correspond[key][1]]);
                result &&= val >= datafilter[correspond[key][0]];
                result &&= val <= datafilter[correspond[key][1]];
                //result &&= val > min && val < max;
            }
        }
        return result;
    });
    clearTable(idTable);
    // показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);
}

document.getElementById("find").onclick = () => {
    filterTable(information, "ttab", document.getElementById("filter"));
}

document.getElementById("clear").onclick = () => {
    clearTable('ttab');
    createTable(information, 'ttab');
}




