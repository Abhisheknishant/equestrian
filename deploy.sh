#!/bin/bash

BRANCH=`cat /dev/stdin | jq '.push.changes | .[0].new.name'`
TARGET_BRANCH=bitbucket

echo $BRANCH
echo $TARGET_BRANCH
