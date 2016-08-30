#!/bin/bash
# command.sh

touch ../logs/$1.log
chmod 777 ../logs/$1.log
casperjs --ssl-protocol=any --ignore-ssl-errors=yes --web-security=no ../collecteurs/collector.js --collector=$1 > ../logs/$1.log
#casperjs --ssl-protocol=any --ignore-ssl-errors=yes ./collecteurs/collector.js --collector=$1 > logs/$1.log 
echo "#END#" >> ../logs/$1.log
#rm logs/$1.log