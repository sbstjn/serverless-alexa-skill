'use strict'

const assert = require('assert')

const answer = (title, message) => {
  return {
    "version": "1.0",
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": message
      },
      "card": {
        "content": message,
        "title": title,
        "type": "Simple"
      },
      "shouldEndSession": true
    },
    "sessionAttributes": {}
  }
}

module.exports.answer = (event, context, callback) => {
  try {
    assert(event.session)
    assert(event.session.application)

    assert(event.request)
    assert(event.request.intent)

    assert(event.request.intent.name.toLowerCase() === 'answer')
    assert(event.request.intent.slots.item.value)
  } catch (e) {
    callback(null, answer(
      "Invalid request",
      "Sorry, but I cannot handle your request"
    ))
  }

  var item = event.request.intent.slots.item.value

  if (item * 1 === 42) {
    callback(null, answer(
      "42",
      "42 is the answer to the Ultimate Question of Life, the Universe, and Everything!"
    ))
  } else {
    callback(null, answer(
      "Asked for " + item,
      "I don't know anything about " + item
    ))
  }
}
