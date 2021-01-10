#!/usr/bin/env bash

time docker build -t woss/ts-test:latest -f Dockerfile .
docker run --rm -p 3000:3000 --name woss-test woss/ts-test:latest
