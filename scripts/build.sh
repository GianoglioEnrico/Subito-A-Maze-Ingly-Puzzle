#!/bin/sh

npm test

cat << EOF
App launched with the following params:

File: ./testMapJson/map.json
ID: 2
Objects: "Knife" "Potted Plant" 
EOF
node index.js ./testMapJson/map.json 2 "Knife" "Potted Plant" 