import Joi from 'joi';

export default {
  // GET api/exchangerate
  exchangeRateIndex:{
    query:{
      to: Joi.string().regex(/BRL/g).required(),
      from: Joi.string().regex(/USD|EUR|ARS/g).required()
    }
  }
};