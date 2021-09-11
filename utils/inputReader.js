"use strict";

const validate = require("../utils/validator");
const NORM_FACTOR = 2; // serve a normalizzare gli argomenti di input
const START_ROOM_INDEX = 1;

function read() {
  let inputArgs = process.argv.slice(NORM_FACTOR);
  validate.inputLength(inputArgs);
  validate.isStartRoomNumber(inputArgs[START_ROOM_INDEX]);

  return inputArgs;
}

module.exports.read = read;
