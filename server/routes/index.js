import express from 'express';
import exchangerateRoutes from './exchangerate';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/exchangerate', exchangerateRoutes);

export default router;