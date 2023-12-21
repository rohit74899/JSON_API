const express = require('express');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the API URL
const apiUrl = "https://s3.amazonaws.com/open-to-cors/assignment.json";




// Create a route to render the HTML page
app.get('/', async (req, res) => {
  try {
    // Dynamically import 'node-fetch'
    // const fetch = (await import('node-fetch')).default;
    const { default: fetch } = await import('node-fetch');

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Render the HTML with the fetched data
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a route to serve the API data
app.get('/api/data', async (req, res) => {
  try {
    // Dynamically import 'node-fetch'
    // const fetch = (await import('node-fetch')).default;
    const { default: fetch } = await import('node-fetch');

    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Send the data as JSON
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
