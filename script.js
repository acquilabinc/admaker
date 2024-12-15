document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Get the form elements
    const product = document.getElementById('product').value;
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
                product: product  // Match the parameter name with server expectation
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Display the response
        responseDiv.innerText = typeof data === 'object' ? 
            JSON.stringify(data, null, 2) : 
            data.toString();
            
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
