#!/usr/bin/env bash
#
# 在留外国人統計統計表 > 	都道府県別　国籍・地域別　在留外国人
# http://www.moj.go.jp/housei/toukei/toukei_ichiran_touroku.html
#

curl -L -o nationality-201906.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031886385&fileKind=0"
curl -L -o nationality-201806.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031770321&fileKind=0"
curl -L -o nationality-201706.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031642055&fileKind=0"
curl -L -o nationality-201606.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031474391&fileKind=0"
curl -L -o nationality-201506.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031322015&fileKind=0"
curl -L -o nationality-201406.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000027237251&fileKind=0"
curl -L -o nationality-201306.xls \
	"https://www.e-stat.go.jp/stat-search/file-download?statInfId=000023609653&fileKind=0"
