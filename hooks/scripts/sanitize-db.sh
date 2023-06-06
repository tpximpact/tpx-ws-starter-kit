!/bin/sh
#
# Cloud Hook: sanitize-db
#
# Run drush sql-sanitize in the target environment. This script works as any
# Cloud hook.

# Map the script inputs to convenient names.
site=$1
target_env=$2
drush_alias=$site'.'$target_env

# Execute a standard drush command.
drush10 @$drush_alias sql-sanitize --yes --sanitize-password=zabra.ihpassrolata
