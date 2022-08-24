"use strict";
const tableBody = document.querySelector('table tbody');
const tableFooter = document.querySelector('table tfoot .total');

const render = () => {
    fetch("../assets/data/device_data.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            var sumPowers = 0;
            for (var i = 0; i < data.length; i++) {
                var newRow = tableBody.insertRow();
                
                var newCell1 = newRow.insertCell();
                var newContent1 = document.createTextNode(`${data[i].Device}`);
                newCell1.appendChild(newContent1);

                var newCell2 = newRow.insertCell();
                var newContent2 = document.createTextNode(`${data[i].MAC_Address}`);
                newCell2.appendChild(newContent2);

                var newCell3 = newRow.insertCell();
                var newContent3 = document.createTextNode(`${data[i].IP}`);
                newCell3.appendChild(newContent3);

                var newCell4 = newRow.insertCell();
                var newContent4 = document.createTextNode(`${data[i].Create_Date}`);
                newCell4.appendChild(newContent4);

                var newCell5 = newRow.insertCell();
                var newContent5 = document.createTextNode(`${data[i].Power_Consumption}`);
                newCell5.appendChild(newContent5);

                sumPowers += parseInt(data[i].Power_Consumption, 10);
            }
            tableFooter.innerHTML = sumPowers.toString();
        })
        .catch((error) => {
            alert(error);
        });
}


