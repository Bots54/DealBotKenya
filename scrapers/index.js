const cheki = require('./cheki');
const jumia = require('./jumia');
const olx = require('./olx');
const CARS = require ('../data/cars')
const PHONES = require ('../data/smartphones')
const phonesQuickReplies = require ('../quickreplies/phones')

module.exports = function (payload, chat) {
  const text = payload.message.text;
  //get an array eg ['iphone', '7']
  let searchTerms = text.split();
  let isCarSearch = CARS.find((car)=> searchTerms.includes(car));
  if(isCarSearch)
    return cheki(text);
  let isPhoneSearch = PHONES.find((phones)=> searchTerms.includes(phones));
  if(isPhoneSearch)
    return jumia(text);
  //API.ai Coming soon;
  return olx(text);
};
