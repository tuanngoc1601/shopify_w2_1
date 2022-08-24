
const tableBody = document.querySelector('table tbody');
const link1 = document.querySelector('.link1');
const link2 = document.querySelector('.link2');
const link3 = document.querySelector('.link3');


const renderRow = (dataRow) => {
    for (let i = 0; i < dataRow.length; i++) {
        let newRow = tableBody.insertRow();

        let newCell1 = newRow.insertCell();
        let newContent1 = document.createTextNode(`${data[i].device_id}`);
        newCell1.appendChild(newContent1);

        let newCell2 = newRow.insertCell();
        let newContent2 = document.createTextNode(`${data[i].name}`);
        newCell2.appendChild(newContent2);

        let newCell3 = newRow.insertCell();
        let newContent3 = document.createTextNode(`${data[i].action}`);
        newCell3.appendChild(newContent3);

        let newCell4 = newRow.insertCell();
        let newContent4 = document.createTextNode(`${data[i].date}`);
        newCell4.appendChild(newContent4);
    }
};

fetch("../assets/data/logs.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        let data1 = [];
        let data2 = [];
        let data3 = [];
        for(var i = 0; i < 12; i++) {
            data1.push(data[i]);
        }

        for(var i = 12; i < 24; i++) {
            data2.push(data[i]);
        }

        for(var i = 24; i < 36; i++) {
            data3.push(data[i]);
        }

        link1.onClick = () => {
            renderRow(data1);
        };

        link2.onClick = () => {
            renderRow(data2);
        };

        link3.onClick = () => {
            renderRow(data3);
        };
    })
    .catch((error) => {
        alert(error);
    });


