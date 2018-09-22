#!/usr/bin/env bash

zip -r ./dist/adict_${1:-latest}.zip ./* -x "*/.*" "./dist/*" "./*.sh"
