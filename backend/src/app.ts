import express from 'express'
import cors from "cors";
const app = express();
import 'dotenv/config';
import router from './routes';
import path from 'path';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
app.use(router);

export default app;