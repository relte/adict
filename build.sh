#!/usr/bin/env bash

mkdir -p dist
zip -r ./dist/adict_${1:-latest}.zip ./* -x "*/.*" "./dist/*" "./*.sh"
