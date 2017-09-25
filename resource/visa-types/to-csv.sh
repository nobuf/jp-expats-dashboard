#!/usr/bin/env bash

asset_dir=../../docs/assets

for filename in *.xls; do
  name="${filename%.*}"
  echo ${name}
  curl -F "file=@$filename" http://localhost:5001/ \
    | tail -n +4 \
    | sed '1s/都道府県,/,prefecture_id/' \
    | sed 's/特別永住者.*$/特別永住者/' \
    | node parse-visa-types.js \
    > ${asset_dir}/${name}.csv
done
