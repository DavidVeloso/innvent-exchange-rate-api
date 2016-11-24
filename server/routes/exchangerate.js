import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import exchangerateCtrl from '../controllers/exchangerate';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(validate(paramValidation.exchangeRateIndex), exchangerateCtrl.index);

export default router;
