# A-Maze-ingly Retro Route Puzzle

Write a program that will output a valid route one could follow to collect all specified items within a map.
The map is a json description of set of rooms with allowed path and contained object.

Exercise starts with an input of:

- json reppresentation of map
- starting room
- list of object to collect

```
Room type allowed fields

  id: Integer
  name: String
  north: Integer //referring to a connected room
  south: Integer //referring to a connected room
  west: Integer //referring to a connected room
  east: Integer //referring to a connected room
  objects: List //of Objects

Object type allowed fields
  name: String //Object Name
```

## Example 1

Map

```json
{
  "rooms": [
    { "id": 1, "name": "Hallway", "north": 2, "objects": [] },
    {
      "id": 2,
      "name": "Dining Room",
      "south": 1,
      "west": 3,
      "east": 4,
      "objects": []
    },
    { "id": 3, "name": "Kitchen", "east": 2, "objects": [{ "name": "Knife" }] },
    {
      "id": 4,
      "name": "Sun Room",
      "west": 2,
      "objects": [{ "name": "Potted Plant" }]
    }
  ]
}
```

Input

```
Start Room ID = 2
Objects To Collect = Knife, Potted Plant
```

Output

| ID  | Room        | Object collected |
| --- | ----------- | ---------------- |
| 0   | Dining Room | None             |
| 1   | Hallway     | None             |
| 2   | Dining Room | None             |
| 3   | Kitchen     | Knife            |
| 2   | Dining Room | None             |
| 4   | Sun Room    | Potted Plant     |

## Example 2

Map

```json
{
  "rooms": [
    { "id": 1, "name": "Hallway", "north": 2, "east": 7, "objects": [] },
    {
      "id": 2,
      "name": "Dining Room",
      "north": 5,
      "south": 1,
      "west": 3,
      "east": 4,
      "objects": []
    },
    { "id": 3, "name": "Kitchen", "east": 2, "objects": [{ "name": "Knife" }] },
    {
      "id": 4,
      "name": "Sun Room",
      "west": 2,
      "north": 6,
      "south": 7,
      "objects": []
    },
    {
      "id": 5,
      "name": "Bedroom",
      "south": 2,
      "east": 6,
      "objects": [{ "name": "Pillow" }]
    },
    { "id": 6, "name": "Bathroom", "west": 5, "south": 4, "objects": [] },
    {
      "id": 7,
      "name": "Living room",
      "west": 1,
      "north": 4,
      "objects": [{ "name": "Potted Plant" }]
    }
  ]
}
```

Input

```
Start Room ID = 4
Objects To Collect = Knife, Potted Plant, Pillow
```

Output

| ID  | Room        | Object collected |
| --- | ----------- | ---------------- |
| 4   | Sun Room    | None             |
| 6   | Bathroom    | None             |
| 4   | Sun Room    | None             |
| 7   | Living Room | Potted Plant     |
| 4   | Sun Room    | None             |
| 2   | Dining Room | None             |
| 5   | Bedroom     | None             |
| 2   | Dining Room | None             |
| 1   | Hallway     | None             |
| 2   | Dining Room | None             |
| 3   | Kitchen     | None             |

## Goals

- [x] TDD approach.
- [x] Build a Docker container with runnable code inside so that we can mount a volume in it and test on different maps.

## Build instructions

Clone the repository then run:

```
npm install
```

Set the permissions before you build the image, running from root folder:

```
chmod +x scripts/run.sh
chmod +x scripts/tests.sh
chmod +x scripts/run_interactive.sh
chmod +x scripts/build.sh
```

To build the docker image:

```
docker build -t mytest .
```

To build code:

```
docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/build.sh
```

To run tests:

```
docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/tests.sh
```

To run:

```
docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/run.sh testMapJson/map.json 2 "Knife" "Potted Plant"
docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/run.sh testMapJson/map2.json 4 "Knife" "Potted Plant" "Pillow"
```

To run iteractively:

```
docker run -it -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/run_interactive.sh
```
