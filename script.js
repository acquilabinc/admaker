document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const question = document.getElementById('question').value; // Get the value from the input field

    try {
        const response = await fetch('https://api.tenxplus.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: 'https://app.wordware.ai/api/released-app/36a0de8d-8a71-4810-ac29-d0a3096f5e5/run',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer wv-KgjmnNP7sMcAbamrRqv4V13Co2OD6BgrpJpqE800fyd0PKCCrT5HN2'
                },
                data: {
                    inputs: {
                        name: question // Use the question variable here
                    },
                    version: '1.0'
                }
            })
        });

        if (!response.ok) { // Check if the response is not okay
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
            document.getElementById('response').innerText = result;
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'An error occurred: ' + error.message; // Display the error message
    }
});
