document.getElementById('apiForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const product = document.getElementById('product').value;
    const submitBtn = document.getElementById('submitBtn');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const errorDiv = document.getElementById('error');
    const responseDiv = document.getElementById('response');
    
    errorDiv.classList.add('hidden');
    responseDiv.classList.add('hidden');
    submitBtn.disabled = true;
    loadingSpinner.classList.remove('hidden');
    
    try {
        const response = await fetch('https://api.tenxplus.com/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Display formatted response
        document.getElementById('chatgpt-text').textContent = data.chatgpt;
        document.getElementById('claude-text').textContent = data.claude;
        responseDiv.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        errorDiv.innerText = `An error occurred: ${error.message}`;
        errorDiv.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        loadingSpinner.classList.add('hidden');
    }
});

// Copy functions
function copyText(text) {
    navigator.clipboard.writeText(text);
}

function showCopiedFeedback(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 2000);
}

document.getElementById('copyHeadlines').addEventListener('click', () => {
    const chatgptText = document.getElementById('chatgpt-text').textContent;
    const claudeText = document.getElementById('claude-text').textContent;
    const headlinesOnly = `${chatgptText}\n${claudeText}`;
    copyText(headlinesOnly);
    showCopiedFeedback(document.getElementById('copyHeadlines'));
});

document.getElementById('copyAll').addEventListener('click', () => {
    const chatgptText = document.getElementById('chatgpt-text').textContent;
    const claudeText = document.getElementById('claude-text').textContent;
    const fullResponse = `ChatGPT:\n${chatgptText}\n\nClaude:\n${claudeText}`;
    copyText(fullResponse);
    showCopiedFeedback(document.getElementById('copyAll'));
});
