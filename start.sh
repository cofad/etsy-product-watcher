#!/bin/bash
deno run --allow-net=:8080,www.etsy.com,smtp.gmail.com:465 --watch ./main.ts