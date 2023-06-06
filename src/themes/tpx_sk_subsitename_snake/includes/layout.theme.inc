<?php

/**
 * @file
 * Functions to support theming page layout in tpx_sk_sitename theme.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_page(&$variables) {
  $moduleHandler = \Drupal::service('module_handler');
  if ($moduleHandler->moduleExists('components')) {
    $variables['has_components_module'] = TRUE;
  }
}
