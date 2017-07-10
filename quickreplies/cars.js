module.exports = function (payload, chat) {
  chat.say({
    text: `Vrum! Vrum! What is your make of choise?`,
    quickReplies: ['Toyota', 'Subaru', 'Hyundai']
  });
};
