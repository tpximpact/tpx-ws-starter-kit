<?php

/**
 * @file
 * Functions to support theming content layout in tpx_sk_subsitename_snake theme.
 */

use Drupal\node\NodeInterface;

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_node(&$variables) {
  $node = $variables['node'];
  if ($node instanceof NodeInterface) {
    $is_front = \Drupal::service('path.matcher')->isFrontPage();
    $variables['is_front'] = $is_front;

    if ($is_front) {
      $variables['#cache']['contexts'][] = 'url.path.is_front';
    }
  }
}

function tpx_sk_subsitename_snake_theme_suggestions_node_alter(array &$suggestions, array $variables) {
  if (\Drupal::service('path.matcher')->isFrontPage()) {
    $suggestions[] = 'node__front';
  }
}

/**
 * Implements hook_preprocess_HOOK() for field.
 */
function tpx_sk_subsitename_snake_preprocess_field(&$variables) {
  if ($variables['element']['#field_name'] == 'field_media_oembed_video') {
    // Set up the iframe src to be lazy loaded in.
    $src = $variables['items'][0]['content']['#attributes']['src'];
    $variables['items'][0]['content']['#attributes']['data-src'] = $src;
    unset($variables['items'][0]['content']['#attributes']['src']);
  }
}
