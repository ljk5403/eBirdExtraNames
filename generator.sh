#!/usr/bin/env bash

sed -e '/\/\/PLACEHOLDER_js_nameMap/ {
    r js_nameMap.txt
    d
}' -e '/\/\/PLACEHOLDER_correction/ {
    r correction.txt
    d
}' main_template.js > main.js
