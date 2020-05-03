#!/usr/bin/env bash
#
# 在留外国人統計統計表 > 都道府県別　在留資格別　在留外国人（総数）
# http://www.moj.go.jp/housei/toukei/toukei_ichiran_touroku.html
#

curl -L -o visa-201906.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031886386&fileKind=0"
curl -L -o visa-201806.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031770322&fileKind=0"
curl -L -o visa-201706.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031642056&fileKind=0"
curl -L -o visa-201606.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031474410&fileKind=0"
curl -L -o visa-201506.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031321809&fileKind=0"
curl -L -o visa-201406.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000027237323&fileKind=0"

# 2013 has a different format. Skip it for now.
#curl -L -o visa-201306.xls \
#	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000023609656&fileKind=0"
