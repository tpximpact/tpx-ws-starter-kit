#!/bin/bash
#
# Cloud Hook: post-code-deploy
#
# The post-code-deploy hook is run whenever you use the Workflow page to
# deploy new code to an environment, either via drag-drop or by selecting
# an existing branch or tag from the Code drop-down list. See
# ../README.md for details.
#
# Usage: post-code-deploy site target-env source-branch deployed-tag repo-url
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
