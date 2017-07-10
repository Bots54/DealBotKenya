const dotenv = require('dotenv');
const BootBot = require('bootbot');
const dealfinder = require('./scrapers/olx');
const carsQuickReplies = require('./quickreplies/cars');
const clothingQuickReplies = require('./quickreplies/clothing');
const phonesQuickReplies = require('./quickreplies/phones');
dotenv.config();

const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_VERIFY_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});
bot.setGreetingText(process.env.TEXT_WELCOME_MESSAGE);
bot.setGetStartedButton((payload, chat) => {
  chat.say(process.env.TEXT_GET_STARTED_MESSAGE);
});

bot.setPersistentMenu([
  {
    type: 'postback',
    title: 'Phone',
    payload: 'PERSISTENT_PHONE'
  },
  {
    type: 'postback',
    title: 'Car',
    payload: 'PERSISTENT_CAR'
  },
  {
    type: 'postback',
    title: 'Clothing',
    payload: 'PERSISTENT_CLOTHING'
  }
]);

bot.on('postback:PERSISTENT_PHONE', carsQuickReplies);
bot.on('postback:PERSISTENT_CAR', clothingQuickReplies);
bot.on('postback:PERSISTENT_PHONE', phonesQuickReplies);


bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	dealfinder(text).then(({ products })=>{
    let results = products.filter((item)=> item.price.length)
    if(!results.length){
      chat.say(process.env.TEXT_NO_RESULT_FOUND).then(() => {
		      chat.say(process.env.TEXT_TYPE_SOMETHING, { typing: true });
	    });
    } else {
      let result = results[Math.floor(Math.random() * results.length)];
      chat.say({
    		attachment: 'image',
    		url: result.image
    	}, { typing: true }).then(() =>{
        chat.say(`${result.item} for ${result.price}\n ${result.link}`, { typing: true })
      });
    }

  })
});


bot.hear(['help'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: process.env.TEXT_HELP_MESSAGE,
		buttons: [
			{ type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
			{ type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
			{ type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
		]
	});
});
bot.start();
