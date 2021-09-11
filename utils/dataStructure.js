"use strict";

const fs = require("fs");

const roomsMap = [];
const adjacencyMap = [];
const objectsMap = [];

/**
 * Read the file provided as input via console
 *
 * @param {string} filePath
 */
function readData(filePath) {
  return fs.readFileSync(filePath);
}

/**
 * Parse the data into a JS object
 *
 * @param {string} data
 */
function parseJson(data) {
  return JSON.parse(data);
}

/**
 * Computes data structures needed to solve the problem
 *
 * @param {object} map
 */
function computeDataStructures(map) {
  map.rooms.forEach((currentRoom) => {
    computeRoomsMap(currentRoom);
    computeAdjacencyMap(currentRoom);
    computeObjectsMap(currentRoom);
  });

  return;
}

/**
 * Computes an array of JSObject
 * In each position matching a room.id stores a JSObject
 * containing the information related to that room
 * e.g. {room.id, room.name, room.neighbors, room.objects}
 *
 * @param {object} room
 */
function computeRoomsMap(room) {
  roomsMap[room.id] = room;
  return roomsMap;
}

/**
 * Computes the adjaceny matrix
 * the elements of the matrix indicate whether pairs of vertices
 * are adjacent or not in the graph.
 *
 * @param {object} room
 */
function computeAdjacencyMap(room) {
  adjacencyMap[room.id] = computeRoomNeighbors(room);
  return adjacencyMap;
}

/**
 * Computes a single row of the adjaceny matrix
 * if the room i is connected room j insert a 1 in position j
 *
 * @param {object} room
 */
function computeRoomNeighbors(room) {
  let neighbors = [];

  if (room.north) {
    neighbors[room.north] = 1;
  }
  if (room.south) {
    neighbors[room.south] = 1;
  }
  if (room.west) {
    neighbors[room.west] = 1;
  }
  if (room.east) {
    neighbors[room.east] = 1;
  }

  return neighbors;
}

/**
 * Computes an array of JSObject
 * Each element represent a pair <object.name: room.id>
 *
 * @param {object} room
 */
function computeObjectsMap(room) {
  if (room.objects.length) {
    room.objects.forEach((object) => {
      objectsMap[object.name] = room.id;
    });
  }

  return objectsMap;
}

/**
 * Given an array of objects as input it returns an array
 * that assosciate each object to the room.id in which it
 * is contained
 *
 * @param {array} objects
 */
function getObjectsRooms(objects) {
  let nodes = [];
  objects.forEach((currentObject) => {
    if (
      objectsMap[currentObject] &&
      !nodes.includes(objectsMap[currentObject])
    ) {
      nodes.push(objectsMap[currentObject]);
    }
  });

  return nodes;
}

const getAdjacencyMap = () => adjacencyMap;

const getObjectsMap = () => objectsMap;

const getRoomsMap = () => roomsMap;

module.exports = {
  readData: readData,
  parseJson: parseJson,
  computeRoomsMap: computeRoomsMap,
  computeAdjacencyMap: computeAdjacencyMap,
  computeRoomNeighbors: computeRoomNeighbors,
  computeObjectsMap: computeObjectsMap,
  computeDataStructures: computeDataStructures,
  getObjectsRooms: getObjectsRooms,
  getAdjacencyMap: getAdjacencyMap,
  getRoomsMap: getRoomsMap,
  getObjectsMap: getObjectsMap,
};
