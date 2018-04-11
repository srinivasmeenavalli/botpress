module.exports = function (bp) {
  var apiai = require("./module/apiai");
  var chatapp = apiai("73a607773b5a49ce880a7b2c442d62b8");

  bp.middlewares.load()

  //Catch 'hello world' from 'facebook'
  bp.hear({
    platform: 'facebook',
    type: 'message',
    text: 'hello world'
  }, (event, next) => {
    const id = event.user.id;
    const last_name = event.user.last_name;
    const first_name = event.user.first_name;

    const text = 'Congrats ' + first_name + " " + last_name + "! Your first chatbot using Botpress is now working."
    var request = chatapp.textRequest(event.text, { sessionId: Math.random() });

    request.end();
    request.on('response', function (response) {

      var CircularJSON = require('circular-json');
      var jsonresp = CircularJSON.stringify(response);

      //bp.messenger.sendText(id, jsonresp);
      bp.messenger.sendTemplate(id, jsonresp);
    });
    request.on('error', function (error) {
      console.log(error);
    });
  })

  //Catch any 'message' from 'facebook'
  bp.hear({
    platform: 'facebook',
    type: 'message',
    text: /.+/i
  }, (event, next) => {
    bp.messenger.sendText(event.user.id, "Sorry, I only answer to 'hello world'...")
  })

}