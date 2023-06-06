<?php

/**
 * @file
 * Functions to support theming navigation in tpx_sk_subsitename_snake theme.
 */

use Drupal\system\Entity\Menu;

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_menu(&$variables) {
  $menu = Menu::load($variables['menu_name']);
  if ($menu instanceof Menu) {
    $variables['menu_label'] = $menu->label();
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function tpx_sk_subsitename_snake_theme_suggestions_pager_alter(array &$suggestions, array $variables) {
  foreach ($variables['pager']['#theme'] as $theme) {
    $suggestions[] = $theme;
  }
}

/**
 * Implements hook_preprocess_HOOK() for menu-local-task templates.
 */
function tpx_sk_subsitename_snake_preprocess_menu_local_task(&$variables) {
  $variables['link']['#options']['attributes']['class'][] = 'tabs__link';
  $variables['link']['#options']['attributes']['class'][] = 'js-tabs-link';

  // Ensure is-active class is set when the tab is active. The generic active
  // link handler applies stricter comparison rules than what is necessary for
  // tabs.
  if (isset($variables['is_active']) && $variables['is_active'] === TRUE) {
    $variables['link']['#options']['attributes']['class'][] = 'is-active';
  }

  if (isset($variables['element']['#level'])) {
    $variables['level'] = $variables['element']['#level'];
  }
}
