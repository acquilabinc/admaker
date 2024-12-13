document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    
    try {
        // Make direct request to Wordware API
        const response = await fetch('https://app.wordware.ai/api/released-app/ea1115da-a83d-429e-9d13-8e996e4f05e4/run', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ww-CAq3IhInvrSSRneRssF0KH6w5QzOIPxFTUFU8iaicwQ8n12BaQQ3h',  // Replace with your actual API key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: {
                    question: question  // Using 'question' as the key per API docs
                },
                version: "^1.0"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = `An error occurred: ${error.message}`;
    }
});

function displayResponse(data) {
    // Since we don't know the exact response format from the API,
    // you might need to adjust this based on the actual response structure
    if (data && typeof data === 'object') {
        document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    } else {
        document.getElementById('response').innerText = 'Invalid response format';
    }
}
