#!/usr/bin/env bash
#
# 在留外国人統計統計表 > 都道府県別　在留資格別　在留外国人（総数）
# http://www.moj.go.jp/housei/toukei/toukei_ichiran_touroku.html
#

curl -o visa-201612.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000031559331"
curl -o visa-201512.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000031399581"
curl -o visa-201412.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000029226530"
curl -o visa-201312.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000024395142"
