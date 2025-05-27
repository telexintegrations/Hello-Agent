import express, { Request, Response} from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import agentCard from './agent.json';




const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

app.get('/.well-known/agent.json', (req: Request, res: Response) => {
  res.send(agentCard);
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
