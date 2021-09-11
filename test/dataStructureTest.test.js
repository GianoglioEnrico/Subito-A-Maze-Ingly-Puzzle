"use strict";

const assert = require("assert");
const ds = require("../utils/dataStructure");

const testMap =
  '{"rooms": [{ "id": 1, "name": "Hallway", "north": 2, "objects": [] }, { "id": 2, "name": "Dining Room", "south": 1, "west": 3, "east": 4, "objects": [] }, { "id": 3, "name": "Kitchen","east":2, "objects": [ { "name": "Knife" } ] }, { "id": 4, "name": "Sun Room","west":2, "objects": [ { "name": "Potted Plant" } ] }]}';

const map = ds.parseJson(testMap);

describe("Data Structures - takes as input a mocked test map", function () {
  describe("#computeDataStructures", function () {
    ds.computeDataStructures(map);
    describe("#getRoomsMap()", function () {
      it("should return a data structure consistent with the provided test map, this means that each non empty position j inside the array should contains the same data of the room with id=j", function () {
        let roomsMap = ds.getRoomsMap();
        map.rooms.forEach((room) => {
          assert.equal(roomsMap[room.id].id, room.id);
          assert.equal(roomsMap[room.id].name, room.name);
          assert.equal(roomsMap[room.id].north, room.north);
          assert.equal(roomsMap[room.id].south, room.south);
          assert.equal(roomsMap[room.id].east, room.east);
          assert.deepEqual(roomsMap[room.id].objects, room.objects);
        });
      });
    });

    describe("#computeObjectsMap()", function () {
      let objectsMap = ds.getObjectsMap();
      it("should return a data structure consistent with the provided test map, this means that in each non empty position j inside the array should contanins the same object contained inside the rooom with id=j ", function () {
        map.rooms.forEach((room) => {
          let objectInRoom = room.objects;
          if (objectInRoom && objectInRoom.length > 0) {
            assert.equal(room.id, objectsMap[room.objects[0].name]);
          }
        });
      });
      it("shoudl return a data structure in which Knife is in room 3 and Potted Plant is in room 4", function () {
        assert.equal(3, objectsMap["Knife"]);
        assert.equal(4, objectsMap["Potted Plant"]);
      });
    });

    describe("#getAdjacencyMap()", function () {
      let adjacencyMap = ds.getAdjacencyMap();
      it("should return a matrix in which room 1 is connected with room 2", function () {
        assert.equal(1, adjacencyMap[1][2]);
      });
      it("shoould return a matrix in which room 2 is connected with room 1, room 3 and room 4", function () {
        assert.equal(1, adjacencyMap[2][1]);
        assert.equal(1, adjacencyMap[2][3]);
        assert.equal(1, adjacencyMap[2][4]);
      });
    });

    describe("#getObjectsRooms()", function () {
      it("should return an array in which Knife should associated with room 3 and Potted Plant shoudl be associated with room 4", function () {
        let objectRooms = ds.getObjectsRooms(["Knife", "Potted Plant"]);
        assert.equal(3, objectRooms[0]);
        assert.equal(4, objectRooms[1]);
      });
    });
  });
});
