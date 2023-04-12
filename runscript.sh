#!/bin/bash
rm -rf BigG/
mkdir BigG
cp -r * ./BigG
rm -rf ./BigG/BigG
tar -czvf  archive.tar.gz BigG/
