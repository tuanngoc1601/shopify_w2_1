const tableBody = document.querySelector('table tbody');
const links = document.querySelectorAll('.route_page .link_page');
const btn = document.querySelector('.btn_input .btn_search');
const input_search = document.querySelector('.btn_input .form_input');

console.log(btn)


let data1 = [];
let data2 = [];
let data3 = [];
let dataPage = [];

const renderRow = (dataRow) => {
    for (let i = 0; i < dataRow.length; i++) {
        let newRow = tableBody.insertRow();

        let newCell1 = newRow.insertCell();
        let newContent1 = document.createTextNode(`${dataRow[i].device_id}`);
        newCell1.appendChild(newContent1);

        let newCell2 = newRow.insertCell();
        let newContent2 = document.createTextNode(`${dataRow[i].name}`);
        newCell2.appendChild(newContent2);

        let newCell3 = newRow.insertCell();
        let newContent3 = document.createTextNode(`${dataRow[i].action}`);
        newCell3.appendChild(newContent3);

        let newCell4 = newRow.insertCell();
        let newContent4 = document.createTextNode(`${dataRow[i].date}`);
        newCell4.appendChild(newContent4);
    }
};

const searchValue = (value, data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        if(data[i].name === value) {
            result.push(data[i]);
        }
    }
    return result;
}

fetch("../assets/data/logs.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        for(var i = 0; i < 12; i++) {
            data1.push(data[i]);
        }

        for(var i = 12; i < 24; i++) {
            data2.push(data[i]);
        }

        for(var i = 24; i < 36; i++) {
            data3.push(data[i]);
        }

        dataPage.push(data1);
        dataPage.push(data2);
        dataPage.push(data3);

        renderRow(data1);

        links.forEach((link, index) => {
            link.onclick = () => {
                document.querySelector('.link_page.active').classList.remove('active');
                link.classList.add('active');
                document.querySelector('tbody').innerHTML = '';
                renderRow(dataPage[index]);
            }
        });

        input_search.onblur = () => {
            console.log(input_search.value);
        }

        btn.onclick = (e) => {
            e.preventDefault();
            
            if(input_search.value === '') {
                alert('Ban chua nhap ten thiet bi!');
            } else {
                dataSearch = searchValue(input_search.value, data);

                if(dataSearch.length === 0) {
                    tableBody.innerHTML = '<span class="not-data">No Result</span>';
                } else {
                    document.querySelector('tbody').innerHTML = '';
                    renderRow(dataSearch);
                }
            }
        }

        var data_input = input_search.value;
        console.log(data_input);
    })
    .catch((error) => {
        alert(error);
    });
