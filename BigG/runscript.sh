#!/bin/bash
rm -rf BigG/
mkdir BigG
cp -r * ./BigG
rm -rf ./BigG/BigG
rm -rf ./BigG/node_modules
tar -czvf  archive.tar.gz BigG/
