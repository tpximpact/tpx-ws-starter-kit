#!/bin/bash
#
# Cloud Hook: post-db-copy
#
# The post-db-copy hook is run whenever you use the Workflow page to copy a
# database from one environment to another. See ../README.md for
# details.
#
# Usage: post-db-copy site target-env db-name source-env

site="$1"
target_env="$2"
source_branch="$3"
deployed_tag="$4"
repo_url="$5"
repo_type="$6"

siteDirectories=('default' 'tpx_sk_subsitename_snake')

run_drush_commands() {
  drush10 "@$site.$target_env" updatedb --no-post-updates -y -l "$siteDirectory" && \
  drush10 "@$site.$target_env" cc drush -l "$siteDirectory" && \
  drush10 "@$site.$target_env" csex config_ignore -y -l "$siteDirectory" && \
  drush10 "@$site.$target_env" cim sync -y -l "$siteDirectory" && \
  drush10 "@$site.$target_env" updatedb --post-updates -y -l "$siteDirectory" && \
  drush10 "@$site.$target_env" cr -l "$siteDirectory"
}

for siteDirectory in "${siteDirectories[@]}"; do
  run_drush_commands
done
