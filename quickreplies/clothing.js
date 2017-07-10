module.exports = function (payload, chat) {
  chat.say({
    text: `Ok, what are you looking for?`,
    quickReplies: ['Mens Clothing', 'Womens Clothing', 'Jewelry']
  });
};
