#!/usr/bin/env bash
#
# Convert those downloaded XLS files to CSV & select some columns
#
# change = column $23 or $25 = 増減数 (A)-(B)

asset_dir=../../docs/assets

for filename in *-foreign-*.xls; do
  name="${filename%.*}"
  echo $name
  echo "id,total,change" > ${asset_dir}/${name}.csv
  curl -F "file=@$filename" http://localhost:5001/ \
    | awk -F "\"*,\"*" '{print $1","$5","$23}' \
    | tail -n +5 \
    >> ${asset_dir}/${name}.csv
done

for filename in *-local-*.xls; do
  name="${filename%.*}"
  echo $name
  echo "id,total,change" > ${asset_dir}/${name}.csv
  curl -F "file=@$filename" http://localhost:5001/ \
    | awk -F "\"*,\"*" '{print $1","$5","$25}' \
    | tail -n +5 \
    >> ${asset_dir}/${name}.csv
done
