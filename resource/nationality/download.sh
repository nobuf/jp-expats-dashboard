#!/usr/bin/env bash
#
# 在留外国人統計統計表 > 	都道府県別　国籍・地域別　在留外国人
# http://www.moj.go.jp/housei/toukei/toukei_ichiran_touroku.html
#

curl -o nationality-201612.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000031559330"
curl -o nationality-201512.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000031399580"
curl -o nationality-201412.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000029226529"
curl -o nationality-201312.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000024395141"
curl -o nationality-201212.xls \
	"http://www.e-stat.go.jp/SG1/estat/Xlsdl.do?sinfid=000021315232"
