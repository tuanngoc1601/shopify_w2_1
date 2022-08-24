"use strict";
const tableBody = document.querySelector('table tbody');
fetch("../assets/data/device_data.json")
.then(response => {
   return response.json();
})
.then(data => {
    console.log(data);
    for(var i = 0; i < data.length; i++) {
        var newRow = tableBody.insertRow();
        var newCell = newRow.insertCell();
        var newContent = document.createTextNode(`${data[i].Device}`);
        newCell.appendChild(newContent);
    }
})
.catch((error) => {
    alert('Error data!');
});