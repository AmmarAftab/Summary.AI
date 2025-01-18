const express = require('express');
const run = require('./story.js');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  return res.json('ok');
});

app.post("/create-story", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const result = await axios.get(prompt);
    const content = result.data;
    const response = await run(content);
    res.json({ story: response });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});


