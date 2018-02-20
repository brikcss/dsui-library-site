#!/bin/sh
## -------------------------------------------------------------------------------------------------
# add-branch-stamp.sh
# -------------------
# @author  brikcss  <https://github.com/brikcss>
# @description  Git hook which adds the source branch to the git commit message (as well as
#               destination branch if it is a merge).
## -------------------------------------------------------------------------------------------------

# Cache the commit message.
COMMIT_MSG=`cat "$1"`

# Remove the branch if it already exists (prevents duplicate branch stamps git commit --ammend).
COMMIT_MSG="${COMMIT_MSG%[^\n][^\n]\[BRANCH:*}"

# Get the current branch name.
SOURCE_BRANCH=`git branch | grep '^\*' | cut -b3-`

# Check if it's a merge commit message.
if [[ $COMMIT_MSG == 'Merge branch '* ]]; then
	SOURCE_BRANCH=`echo $COMMIT_MSG | cut -d "'" -f 2`
fi

# Append the branch name(s) to the commit message.
if [[ $SOURCE_BRANCH == '' ]]; then
	SOURCE_BRANCH='Unknown';
fi
echo "$COMMIT_MSG\n\n[BRANCH: $SOURCE_BRANCH]" > "$1"
