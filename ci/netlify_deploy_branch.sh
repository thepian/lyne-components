#!/bin/bash

# this script is used in .travis.yml

# this script is being made executable with
# chmod ugo+x netlify_deploy_branch.sh

# set flags for execution of this file:
# -e: make sure command returns non-zero exit code as soon as somehting fails
set -e

# make storybook build
npm run build:storybook

# deploy storybook on netlify
netlify deploy --message "++$1++" --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --dir ./storybook-static/
