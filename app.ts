import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

const app: Express = express();
const port: number = 8080;
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const publicRoutes = require('./routes/public');

app.use('/', publicRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
