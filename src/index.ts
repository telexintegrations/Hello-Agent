import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());


app.get('/.well-known/agent.json', (req, res) => {
  const agentCardPath = path.join(__dirname, 'agent.json');
  const agentCard = JSON.parse(fs.readFileSync(agentCardPath, 'utf-8'));
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(agentCard);
});


app.post('/task', (req, res) => {
  const { skill_id, input } = req.body;

  if (skill_id === 'greet') {
    res.json({ output: 'Hello! How can I assist you today?' });
  } else {
    res.status(400).json({ output: 'Unknown skill ID.' });
  }
});

app.listen(port, () => {
  console.log(`Agent is running at http://localhost:${port}`);
});
