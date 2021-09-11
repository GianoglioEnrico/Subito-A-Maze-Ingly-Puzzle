"use strict";

const reader = require("./utils/inputReader");
const ds = require("./utils/dataStructure");
const validate = require("./utils/validator");
const routePlanner = require("./route/routePlanner");
const printer = require("./utils/print");

/*
Indici in cui si trovano i parametri passati da console
dopo la normalizzazione di argv
*/
const FILE_PATH_INDEX = 0;
const TO_COLLECT_INDEX = 2;
const START_ROOM_INDEX = 1;
const ERR_EXIT_CODE = 1;

const args = reader.read();
const filePath = args[FILE_PATH_INDEX];
const toCollect = args.slice(TO_COLLECT_INDEX);
const startRoom = Number(args[START_ROOM_INDEX]);

const data = ds.readData(filePath);
const map = ds.parseJson(data);

ds.computeDataStructures(map);
const roomsMap = ds.getRoomsMap();
const targetRooms = ds.getObjectsRooms(toCollect);
const objectsMap = ds.getObjectsMap();

validate.startRoom(startRoom, roomsMap);
validate.objectsToCollect(toCollect, objectsMap);

const adjacencyMap = ds.getAdjacencyMap();
const route = routePlanner.getRoute(adjacencyMap, startRoom, targetRooms);

isRouteEmpty(route);
printer.printResult(route, roomsMap, toCollect);

/**
 * Checks if the computed route is empty, if it's return an error starting
 * that it's impossible to finde a proper route to collect all the objectsMap
 *
 * @param {array} route
 */
function isRouteEmpty(route) {
  if (!route) {
    process.stderr.write("\nErrore | Impossibile trovare un percorso\n");
    process.exitCode = ERR_EXIT_CODE;
    process.exit(ERR_EXIT_CODE);
  }
}
