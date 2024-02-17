import express from 'express'
import cors from "cors";
const app = express();
import 'dotenv/config';
import router from './routes';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

const port = process.env.PORT;

app.listen(port, () => console.log("Server running on port " + port));