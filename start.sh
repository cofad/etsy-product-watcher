#!/bin/bash
deno run --allow-env --allow-net=:8080,smtp.gmail.com:465,openapi.etsy.com --watch ./main.ts