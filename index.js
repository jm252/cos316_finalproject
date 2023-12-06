function getUsage() {
        url = "http://localhost:55556/getUsage"
        fetch(url, {method: 'GET',})
        .then(response => response.json())
        .then(data => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            updateTable(parsedData);
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors as needed
        });
    }
 
document.addEventListener('DOMContentLoaded', getUsage())

function updateTable(data) {
    const tableBody = document.getElementById('content');

    // Clear existing content
    tableBody.innerHTML = '';

    // Iterate over the data and create rows
    data.forEach(entry => {
        console.log(entry)
        console.log(entry.domain)
        console.log(entry.time)
        const row = document.createElement('tr');

        const domainCell = document.createElement('td');
        domainCell.textContent = entry.domain;

        const timeCell = document.createElement('td');
        timeCell.textContent = entry.time;

        row.appendChild(domainCell);
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    });
}