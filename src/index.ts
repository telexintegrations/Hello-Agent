import express, { Request, Response} from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';


const agentJsonPath = path.join(__dirname, 'agent.json');
const agentJson = JSON.parse(fs.readFileSync(agentJsonPath, 'utf-8'));

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

app.get('/.well-known/agent.json', (req, res) => {
  res.json(agentJson);
});


app.post('/task', (req: Request, res: Response) => {
 const task = req.body;

 if (!task) res.status(400).json({ error: 'Task is required' });
 console.log('Received task:', task);

 res.status(200).json({ message: "Working on the task 😊 ==>", task });
 return;
})

app.listen(port, () => {
  console.log(`Agent is running at http://localhost:${port}`);
});
