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
        const response = await fetch('http://147.182.232.135/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'https://tenxplus.com'
            },
            body: JSON.stringify({
                question: question
            }),
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Display the response
        if (data && typeof data === 'object') {
            responseDiv.innerText = JSON.stringify(data, null, 2);
        } else {
            responseDiv.innerText = 'Invalid response format';
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

// Add visual feedback for form interaction
const questionInput = document.getElementById('question');
questionInput.addEventListener('focus', function() {
    this.classList.add('focus');
});

questionInput.addEventListener('blur', function() {
    this.classList.remove('focus');
});

// Clear error message when user starts typing
questionInput.addEventListener('input', function() {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.add('hidden');
});
