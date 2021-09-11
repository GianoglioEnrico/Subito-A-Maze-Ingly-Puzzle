"use strict";

const assert = require("assert");
const algorithm = require("../algorithm/bfs");

const graph = [
  [1, 1, 0, 0, 1, 0],
  [1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
];

const start = 1;
const end = 5;
const parents = [1, 2, null, 2, 1, 3];
const targetNode = 4;

describe("Algorithm", function () {
  describe("#bfs()", function () {
    it("shoudl return [1,2,3,5] when input are test graph, start =1, end=5", function () {
      assert.deepStrictEqual([1, 2, 3, 5], algorithm.bfs(graph, start, end));
    });
  });

  describe("#computePath()", function () {
    it("should return [2,1,4] when parents=[ 1, 2, null, 2, 1, 3 ], targetode=4 ", function () {
      assert.deepStrictEqual(
        [2, 1, 4],
        algorithm.computePath(parents, targetNode)
      );
    });
  });
});
