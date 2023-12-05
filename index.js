function getUsage() {
        url = "http://localhost:55556/getUsage"
        fetch(url, {method: 'GET',})
        .then(response => response.json())
        .then(data => {
        // Update the content in the popup
        document.getElementById('content').innerText = JSON.stringify(data);
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors as needed
        });
    }
 
document.addEventListener('DOMContentLoaded', getUsage())