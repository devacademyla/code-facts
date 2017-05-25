'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "Code Facts";
var GET_FACT_MESSAGE = "Did you know? ";
var HELP_MESSAGE = "You can say tell me a code fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGES = [
  "Goodbye!",
  "See you later!",
  "Later!",
  "Until next time!",
  "end of line"
];

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
  "The first computer programmer was Ada Lovelace.",
  "The first game was created in 1961.",
  "The phrase 'Open Source' was coined in 1998 by Netscape.",
  "Linux was first released by Linus Torvalds in 1991.",
  "macOS and Linux share a Unix-like base.",
  "Google's informal motto is Don't Be Evil, coined by Paul Buchheit.",
  "Google has a Klingon interface for their content.",
  "The first operating system Microsoft made was actually Xenix, a version of Unix under a different name.",
  "The first high-level programming language was FORTRAN.",
  "JavaScript doesn't actually have anything to do with the Java programming language. The name was chosen to make JavaScript more popular at the time.",
  "The first computer bug was actually a real bug that had died inside of a computer.",
  "The first computer virus was created in 1983 by Ted Cohen. It was benign, and couldn't hurt a fly.",
  "The source code for the C programming language is actually written in C.",
  "The first primitive computing machines were actually powered by steam.",
  "Spacewar, made in 1962, was the first video game ever made.",
  "You are more likely to be killed by wolves than have a SHA-1 collision in Git.",
  "92% of the world's currency exists on computers.",
  "There's a programming language called Arnold C, where the basic keywords are replaced with quotes from different Schwarzenegger movies. No, I'm serious!",
  "HTML isn't a programming language. It's actually a markup language for creating web pages. No programming logic involved."
];

function randomFromArray(array) {
  var factIndex = Math.floor(Math.random() * array.length);
  var random = array[factIndex];
  return random;
}

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    this.emit('GetNewFactIntent');
  },
  'GetNewFactIntent': function() {
    var factArr = data;
    var factIndex = Math.floor(Math.random() * factArr.length);
    var randomFact = factArr[factIndex];
    var speechOutput = GET_FACT_MESSAGE + randomFact;
    this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
  },
  'AMAZON.HelpIntent': function() {
    var speechOutput = HELP_MESSAGE;
    var reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', randomFromArray(STOP_MESSAGES));
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', randomFromArray(STOP_MESSAGES));
  }
};
