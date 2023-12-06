function getUsage() {
        url = "http://localhost:55556/getUsage"
        fetch(url, {method: 'GET',})
        .then(response => response.json())
        .then(data => updateTable(data))
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