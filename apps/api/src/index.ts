import express from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`API server running on http://localhost:${config.port}`);
});
