#!/bin/sh
echo The app is ready to run, insert parameters: 
read -p "file:" fileName
read -p "id:" id
read -p "object:" object

IFS=, paths=($object)
for (( i=0; i<${#paths[@]}; i++ ))
do
   echo "[$i] ${paths[$i]}"
done

node index.js $fileName $id $object