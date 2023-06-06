#!/bin/bash
#
# Cloud Hook: post-code-update
#
# The post-code-update hook runs in response to code commits.
# When you push commits to a Git branch, the post-code-update hooks runs for
# each environment that is currently running that branch. See
# ../README.md for details.
#
# Usage: post-code-update site target-env source-branch deployed-tag repo-url
#                         repo-type

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
