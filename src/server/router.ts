import bodyParser from 'body-parser';
import cors from 'cors';
import { httpLogger } from '../middlewares';
import health from '../routes/health';

export default (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(httpLogger);

  /* below is the routing section */
  app.use('/health', health);

  return app;
};
