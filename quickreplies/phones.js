module.exports = function (payload, chat) {
  chat.say({
    text: `I can help you find a phone. Choose your poison.`,
    quickReplies: ['iPhone', 'Samsung', 'Techno', 'Huawei', 'Infinix']
  });
};
