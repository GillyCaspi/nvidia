import express, {Express} from 'express';
import cors from 'cors';

export default function makeServer(): Express {
    const server = express();
    server.use(express.json());
    server.use(cors());
    return server;
}