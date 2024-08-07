document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const question = document.getElementById('question').value; // Get the value from the input field

    try {
        const response = await fetch('https://api.tenxplus.com/', { // Use your API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: 'https://app.wordware.ai/api/released-app/36a0de8d-8a71-4810-ac29-d0a3096f5e5/run', // Use your API endpoint
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer w-KgimnNP7sMcAbamrRqv4V13Co20D6BgrpJpqE80OfydPKCCrT5HN2', // Use your API key
                    'Content-Type': 'application/json'
                },
                data: {
                    inputs: {
                        name: question // Use the question variable here
                    },
                    version: '^1.0'
                }
            })
        });

        if (!response.ok) { // Check if the response is not okay
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        displayResponse(data); // Call the function to display the response

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
        document.getElementById('response').innerText = `An error occurred: ${error.message}`; // Display the error message
    }
});

function displayResponse(data) {
    const chunks = data.map(item => item.value).filter(item => item.type === 'chunk' && item.value.trim() !== '');
    const text = chunks.map(chunk => chunk.value).join(' ');
    document.getElementById('response').innerText = text;
}
