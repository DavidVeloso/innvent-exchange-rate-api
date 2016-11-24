import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import request from 'request-promise';
import moment from 'moment';
import Promise from 'bluebird';

const config = require('../../config/env');

/**
 * Returns the week exchange rate
 * @property {string} req.query.to - name of currency.
 * @property {string} req.query.from - name of currency.
 * @returns  {to: string, from:sting, data: Array[{date:string, value:number}]}
 */
function index(req, res, next){
	
  const defaultUrl = `${config.API_LAYER_HOST}/convert?access_key=${config.API_LAYER_KEY}`;
  const days = getLastWeek();
  const from = req.query.from;
  const to = req.query.to;       
  const amount = 1;  

  let promises = [];

  for (let day = 0; day < days.length; day++) {
    let url = `${defaultUrl}&from=${from}&to=${to}&amount=${amount}&date=${days[day]}&format=1`;
    promises.push(request(url));
  };

  Promise.all(promises)
    .then(resolvePromise)
    .then(data => {
      let result = {
        to: to,
        from: from,
        amount: amount,
        data: data
      };
      return res.json(result);
    })
    .catch(err => { 
		  const error = new APIError('apilayer failed!', httpStatus.INTERNAL_SERVER_ERROR);
		  return next(error);
    })

}

function resolvePromise (data) {
  return data.map(res => {
    let parsed = JSON.parse(res);
    let newObj = {
      date: moment(parsed.date).format('DD/MM/YYYY'),
      value: parsed.result
    };
    return newObj;
  });
}

function getLastWeek () {
  let startDay = moment().subtract(6, 'days');
  let today = moment();
  let days = [];
  let day = startDay;
  while (day <= today) {
    days.push(day.format("YYYY-MM-DD"));
    day = day.clone().add(1, 'd');
  }
  return days;
};

export default {index};