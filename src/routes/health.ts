import express from 'express';

const router = express.Router();

router.get('/', (req, res) =>
  /*  #swagger.tags = ['Health']
      #swagger.path = '/health'
      #swagger.description = 'Health check endpoint.'
	*/
  res.send('Healthy!')
);

export default router;
