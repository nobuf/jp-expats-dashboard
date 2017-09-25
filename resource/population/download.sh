#!/usr/bin/env bash
#
# 住民基本台帳に基づく人口、人口動態及び世帯数調査
# https://www.e-stat.go.jp/SG1/estat/GL08020102.do?_toGL08020102_&tclassID=000001028704&cycleCode=7&requestSender=estat
#

curl -o population-foreign-2017.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007976817&releaseCount=1"
curl -o population-local-2017.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007976793&releaseCount=1"

curl -o population-foreign-2016.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007687092&releaseCount=1"
curl -o population-local-2016.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007687069&releaseCount=1"

curl -o population-foreign-2015.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007427638&releaseCount=1"
curl -o population-local-2015.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007427637&releaseCount=1"

curl -o population-foreign-2014.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007427775&releaseCount=2"
curl -o population-local-2014.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000007427726&releaseCount=2"

curl -o population-foreign-2013.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000006651997&releaseCount=2"
curl -o population-local-2013.xls \
	"https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_xlsDownload_&fileId=000006652027&releaseCount=2"