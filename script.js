const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware and specify the allowed origins
const allowedOrigins = ['http://localhost:8000', 'https://tenxplus.com'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Handle preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
});

// Handle POST requests to the root URL
app.post('/', async (req, res) => {
    // Log the incoming request body for debugging
    console.log('Incoming request body:', req.body);

    const { url, method, headers, data } = req.body;

    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    try {
        const response = await axios({
            url,
            method: method || 'GET',
            headers: headers || {},
            data: data || null,
            responseType: 'stream',
        });

        let responseData = '';

        response.data.on('data', (chunk) => {
            responseData += chunk.toString();
        });

        response.data.on('end', () => {
            res.send(responseData);
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
