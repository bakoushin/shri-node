#!/bin/bash
export REPO=registry.heroku.com/shri-node-$MODE/web
docker build --tag $REPO .
docker login --username=_ --password=$HEROKU_AUTH registry.heroku.com
docker push $REPO