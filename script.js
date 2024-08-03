document.getElementById('apiForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const question = document.getElementById('question').value; // Get the value from the input field
    
    try {
        const response = await fetch('https://app.wordware.ai/api/released-app/eal115da-a83d-429e-9d13-0e996e4f05e4/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ww-KgimnNP7sMcAbamrRqw4V13Co20DG8grpJpqE80OfyOdPKCCrT5HN2' // Ensure the API key is a string
            },
            body: JSON.stringify({
                inputs: { question: question }, // Send the question in the required format
                version: "1.0"
            })
        });

        if (!response.ok) { // Check if the response is not okay
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        document.getElementById('response').innerText = JSON.stringify(data, null, 2); // Display the response in a formatted way
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
        document.getElementById('response').innerText = 'An error occurred: ' + error.message; // Display a user-friendly error message
    }
});
