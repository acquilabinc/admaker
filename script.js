document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Get the form elements
    const productInput = document.getElementById('product');
    console.log('Product input element:', productInput); // Debug log
    
    const product = productInput?.value;
    console.log('Product value:', product); // Debug log
    
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
        console.log('Making request with product:', product); // Debug log
        
        const response = await fetch('https://api.tenxplus.com/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                product: product
            })
        });

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data); // Debug log
        
        // Display the response
        if (data && typeof data === 'object') {
            responseDiv.innerText = JSON.stringify(data, null, 2);
        } else {
            responseDiv.innerText = 'Invalid response format';
        }
            
    } catch (error) {
        console.error('Detailed error:', error); // Enhanced error logging
        errorDiv.innerText = `An error occurred: ${error.message}`;
        errorDiv.classList.remove('hidden');
    } finally {
        // Reset loading state
        submitBtn.disabled = false;
        loadingSpinner.classList.add('hidden');
    }
});

// Add DOMContentLoaded check
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('apiForm');
    console.log('Form element:', form); // Debug log
});
