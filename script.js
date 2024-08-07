document.getElementById('apiForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const responseElement = document.getElementById('response');
    responseElement.innerText = ''; // Clear previous response

    try {
        const response = await fetch('https://api.tenxplus.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: 'https://app.wordware.ai/api/released-app/ea1115da-a83d-429e-9d13-0e996e4f05e4/run',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ww-12Tj2U7B3kSS3lPghrmYR47L25A7CaPOxfo7ZwwRN8pu76z0eUa1Gw'
                },
                data: {
                    inputs: {
                        name: question
                    },
                    version: '1.0'
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            try {
                const parsedChunk = JSON.parse(chunk);
                if (Array.isArray(parsedChunk)) {
                    parsedChunk.forEach(item => {
                        if (item.type === 'chunk' && item.value.trim() !== '') {
                            responseElement.innerText += item.value + ' ';
                        }
                    });
                }
            } catch (parseError) {
                console.error('Error parsing chunk:', parseError);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'An error occurred: ' + error.message;
    }
});
