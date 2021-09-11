"use strict";

const assert = require("assert");
const print = require("../utils/print");

const route = [2, 4, 2, 3];
const roomsMap = [
  {},
  { id: 1, name: "Hallway", north: 2, objects: [] },
  { id: 2, name: "Dining Room", south: 1, west: 3, east: 4, objects: [] },
  { id: 3, name: "Kitchen", east: 2, objects: [{ name: "Knife" }] },
  { id: 4, name: "Sun Room", west: 2, objects: [{ name: "Potted Plant" }] },
];
const toCollect = ["Knife", "Potted Plant"];

describe("Print", function () {
  describe("#printCollectedObjects()", function () {
    it("should execute without error, eg returning 0", function () {
      assert.equal(0, print.printResult(route, roomsMap, toCollect));
    });
  });
});
