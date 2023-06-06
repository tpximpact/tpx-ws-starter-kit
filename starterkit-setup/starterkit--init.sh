# Ensure npm packages are installed.
[ -d node_modules ] || npm i;

# Default variables.
DRY_RUN=0
DIRECTORY="**"

# Get variable overrides.
. .env.local

DEFAULT_RENAMER_ARGS="--view=diff $([ -z $DRY_RUN ] && echo '--dry-run')"
DEFAULT_REPLACE_ARGS="--configFile=./starterkit-setup/starterkit--replace-file-contents.js"

# These strings should be ordered lest to most specific match to avoid conflicts.
FIND_STRINGS=(
  "TPXSKSITENAMEPASCAL"
  "TPX_SK_ACQUIA_SITENAME"
  "TPX_SK_SITENAME_KEBAB"
  "TPX_SK_SITENAME_SNAKE"
  "TPX_SK_SITENAME" # This must run last to avoid early replacement.
  "TPXSKSUBSITENAMEPASCAL"
  "TPX_SK_ACQUIA_SUBSITENAME"
  "TPX_SK_SUBSITENAME_KEBAB"
  "TPX_SK_SUBSITENAME_SNAKE"
  "TPX_SK_SUBSITENAME" # This must run last to avoid early replacement.
)

# Also search for occurrences of the string that use kebab-case rather than snake_case.
# Some files & directory names, such as those used by docker/ddev & package.json must use kebab-case.
# This means only the snake_case version of a string needs to be defined in the `$FIND_STRINGS` array.
for FIND in "${FIND_STRINGS[@]}"; do
  FIND_KEBAB_CASE=$(echo "${FIND}" | tr '_' '-')
  FIND_STRINGS+=("$FIND_KEBAB_CASE")
done

for FIND in "${FIND_STRINGS[@]}"; do
  SEARCH=$(echo "${FIND}" | tr '-' '_')
  REPLACEMENT=${!SEARCH}

  if [ ! -z "$REPLACEMENT" ]; then
    # File & directory name replacements.
    ./node_modules/.bin/renamer $DEFAULT_RENAMER_ARGS "!(node_modules)/$DIRECTORY" --find "/$FIND/i" --replace "$REPLACEMENT" --path-element name

    # File contents replacements.
    DIRECTORY=$DIRECTORY STARTERKIT_FIND="$FIND" STARTERKIT_REPLACEMENT="$REPLACEMENT" ./node_modules/.bin/replace-in-file "$DEFAULT_REPLACE_ARGS"

    COMPLETE_REPLACEMENTS+=("Replaced '$FIND' with '$REPLACEMENT' across all files & directories");
  fi;
done

printf "\n\n"
for COMPLETE in "${COMPLETE_REPLACEMENTS[@]}"; do
  printf "\t$COMPLETE\n"
done;
