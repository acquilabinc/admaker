document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get the form elements
    const question = document.getElementById('question').value;
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const errorDiv = document.getElementById('error');
    const responseDiv = document.getElementById('response');

    // Clear previous responses and errors
    errorDiv.classList.add('hidden');
    responseDiv.innerText = '';

    // Show loading state
    submitBtn.disabled = true;
    loadingSpinner.classList.remove('hidden');

    try {
        const response = await fetch('https://api.tenxplus.com/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                question: question
            }),
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Process streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
            responseDiv.innerText = result; // Display partial results
        }
    } catch (error) {
        console.error('Error:', error);
        errorDiv.innerText = `An error occurred: ${error.message}`;
        errorDiv.classList.remove('hidden');
    } finally {
        // Reset loading state
        submitBtn.disabled = false;
        loadingSpinner.classList.add('hidden');
    }
});
