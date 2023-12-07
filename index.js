function updateTable(data, id) {
    const tableBody = document.getElementById(id);

    // Clear existing content
    tableBody.innerHTML = '';

    for (const [url, time] of Object.entries(data)) {
        const row = document.createElement('tr');

        const domainCell = document.createElement('td');
        domainCell.textContent = url;

        const timeCell = document.createElement('td');
        timeCell.textContent = time;

        row.appendChild(domainCell);
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    }
}

function getUsageAll() {
        url = "http://localhost:55556/getUsageAll"
        fetch(url, {method: 'GET',})
        .then(response => response.json())
        .then(data => updateTable(data, 'contentAll'))
        .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors as needed
        });
    }

function getUsageWeek() {
    url = "http://localhost:55556/getUsageWeek"
    fetch(url, {method: 'GET',})
    .then(response => response.json())
    .then(data => updateTable(data, 'contentWeek'))
    .catch(error => {
    console.error('Error fetching data:', error);
    // Handle errors as needed
    });
}

function getUsageDay() {
    url = "http://localhost:55556/getUsageDay"
    fetch(url, {method: 'GET',})
    .then(response => response.json())
    .then(data => updateTable(data, 'contentDay'))
    .catch(error => {
    console.error('Error fetching data:', error);
    // Handle errors as needed
    });
}

document.addEventListener('DOMContentLoaded', getUsageAll(), getUsageWeek(), getUsageDay())