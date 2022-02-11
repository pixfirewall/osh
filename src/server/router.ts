import bodyParser from 'body-parser';
import cors from 'cors';
import { athentication, bodyValidate, httpLogger } from '../middlewares';
import health from '../routes/health';
import user from '../routes/user';
import products from '../routes/product';
import wishList from '../routes/wishList';

export default (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(athentication);
  app.use(bodyValidate);
  app.use(httpLogger);

  /* below is the routing section */
  app.use('/health', health);
  app.use('/users', user);
  app.use('/products', products);
  app.use('/wishlist', wishList);

  return app;
};
