#!/usr/bin/env bash

asset_dir=../../docs/assets

for filename in *.xls; do
  name="${filename%.*}"

  curl -F "file=@$filename" http://localhost:5001/ \
    | tail -n +4 \
    | sed '1s/都 道 府 県,/,都道府県/' \
    | sed 's/[,]*$//' \
    | node parse-nationality.js \
    > ${asset_dir}/${name}.csv
done
