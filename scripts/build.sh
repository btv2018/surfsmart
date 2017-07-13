#!/bin/sh


scripts/airport-codes-converter.py

scripts/google-translate-languages-converter.py

VERSION=`cat VERSION`
VERSION_BUILD=`git log --oneline -1 --abbrev-commit --no-color | cut -f1 -d' '`
VERSION=$VERSION-$VERSION_BUILD
VERSION_FILE_NAME="generated/version.js"

echo "VERSION = \"$VERSION\";" > $VERSION_FILE_NAME
echo "Version $VERSION written to $VERSION_FILE_NAME"

