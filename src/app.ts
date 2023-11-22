import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to Assignment 2');
});

export default app;
