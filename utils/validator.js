"use strict";

const MIN_ALLOWED_PAREMETERS = 2;
const ERR_EXIT_CODE = 1;

process.exitCode = 0;

/**
 * Checks if the provided start room is contained inside the maze
 *
 * @param {number} startRoom id provided as input
 * @param {array} roomsMap id provided as input
 */
function startRoom(startRoom, roomsMap) {
  if (!roomsMap[startRoom]) {
    process.stderr.write("\nErrore | Stanza di partenza non valida\n");
    process.exitCode = ERR_EXIT_CODE;
    process.exit(ERR_EXIT_CODE);
  }
}

/**
 * Checks if the provided objects to collcet are contained inside the maze
 *
 * @param {array} toCollect objects to be collected
 * @param {array} objectsMap objects contained inside the maze
 */
function objectsToCollect(toCollect, objectsMap) {
  toCollect.forEach((object) => {
    isObjectValid(object, objectsMap);
  });
}

/**
 * Checks if the provided object is inside the maze
 * if it's not exit by returning a proper error code
 *
 * @param {string} object name
 */
function isObjectValid(object, objectsMap) {
  if (!objectsMap[object]) {
    process.stderr.write("\nErrore | Impossibile trovare un percorso\n");
    process.exitCode = ERR_EXIT_CODE;
    process.exit(ERR_EXIT_CODE);
  }
}

/**
 * Checks if the input args are valid
 *
 * @param {array} inputArgs used to call the script
 */
function inputLength(inputArgs) {
  if (inputArgs.length < MIN_ALLOWED_PAREMETERS) {
    process.stderr.write(
      "\nErrore | Il numero minimo di input consetito è pari a due\n"
    );
    process.exitCode = ERR_EXIT_CODE;
    process.exit(ERR_EXIT_CODE);
  }
}

/**
 * Checks if start room is a valid number (e.g. an integer)
 *
 * @param {string} startRoom provided as input argument
 */
function isStartRoomNumber(startRoom) {
  let start = Number(startRoom);
  if (!Number.isInteger(start) || start < 1) {
    process.stderr.write("\nErrore | Stanza di partenza non valida\n");
    process.exitCode = ERR_EXIT_CODE;
    process.exit(ERR_EXIT_CODE);
  }
}

module.exports = {
  inputLength: inputLength,
  isStartRoomNumber: isStartRoomNumber,
  isObjectValid: isObjectValid,
  objectsToCollect: objectsToCollect,
  startRoom: startRoom,
};
