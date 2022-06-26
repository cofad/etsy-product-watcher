#!/bin/bash
deno run \
  --allow-env=GMAIL_PASSWORD,ETSY_API_KEY \
  --allow-net=:8080,smtp.gmail.com:465,openapi.etsy.com \
  --watch \
  --check \
  ./src/main.ts