#!/bin/sh

echo "Generate data ..."
./script/build.sh

echo "Remove gh-pages branch ..."
git branch -D gh-pages
git push origin --delete gh-pages

git checkout --orphan gh-pages

# Generate a version with dark theme.
cat surfsmart.html | \
    sed 's/jquery-ui.min.css/jquery-ui.dark-theme.css/' | \
    sed 's/style.css/style-dark-theme.css/' > surfsmart-dark.html

cp surfsmart.html index.html

git add -f generated/* index.html surfsmart-dark.html
git commit -m"Deploy"

echo "Push branch ..."
git push --set-upstream origin gh-pages
