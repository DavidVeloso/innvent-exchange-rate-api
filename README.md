# innvent-exchange-rate-api

A simple api to get week exchange rate.

## Getting Started

Clone the repo:
```sh
git clone git@github.com:DavidVeloso/innvent-exchange-rate-api.git
cd innvent-exchange-rate-api
```

Install dependencies:
```sh
# set API_LAYER_KEY and API_LAYER_HOST on env var 

npm install
```
Start server:
```sh
npm start
```

Execute tests:
```sh
# compile with babel and run tests
npm test (or gulp mocha)
```

## Usage

To get current week exchange rate just pass the currency on query.

Example:

```http
/api/exchangerate?to=BRL&from=USD
```
Return:
```javascript
res: { 
  to: 'BRL',
  from: 'USD',
  amount: 1,
  data: 
   [ { date: '18/11/2016', value: 3.392204 },
     { date: '19/11/2016', value: 3.382504 },
     { date: '20/11/2016', value: 3.392204 },
     { date: '21/11/2016', value: 3.388398 },
     { date: '22/11/2016', value: 3.350496 },
     { date: '23/11/2016', value: 3.4321 },
     { date: '24/11/2016', value: 3.3909 } ]
}
```

Currency Avaliable (USD, EUR ,ARS, BRL);

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.

## Meta
David Veloso – davidedsoon@gmail.com
This project was based on [Kunal boilerplate](http://github.com/KunalKapadia/express-mongoose-es6-rest-api)