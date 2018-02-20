#!/bin/sh
## -------------------------------------------------------------------------------------------------
# is-stage-clean.sh
# -----------------
# @author  brikcss  <https://github.com/brikcss>
# @description  Git hook which checks if the stage is clean.
## -------------------------------------------------------------------------------------------------

UNTRACKED=false
LOG_FILES=false

# Grab cli arguments.
for ARG in "$@"; do
	case $ARG in
		-u|--include-untracked)
			UNTRACKED=true;;
	esac
done

# Check git status.
if [[ $UNTRACKED = true ]]; then
	DIRTY_FILES=$(git status --porcelain)
else
	DIRTY_FILES=$(git status --porcelain 2>/dev/null| egrep "^(M| M)")
fi

# Test if state is clean (returns true if clean, false if dirty).
if [[ $DIRTY_FILES ]]; then
	echo "[FAIL] Uh oh... You must have a clean stage to push code (no staged or unstaged files). The following files are \"dirty\":\n\n${DIRTY_FILES}\n"
	exit 1
fi
