module.exports = function(bp) {
  bp.hear('MENU_SEND_EX_03', (event, next) => {
    event.reply('#textWithQuickRepliesIcon', {
      icon1: '${process.env.BOT_BASE_URL}/button_red.png',
      icon2: '${process.env.BOT_BASE_URL}/button_blue.png',
      icon3: '${process.env.BOT_BASE_URL}/button_green.png'
    })
  })
  
  bp.hear(/QR_(RED|GREEN|BLUE)_BUTTON/, (event, next) => {
    event.reply('#textWithQuickRepliesIcon_reply', { color: event.captured[0].toLowerCase() })
  })
}