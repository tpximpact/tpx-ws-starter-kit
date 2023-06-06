<?php

/**
 * @file
 * Functions to support theming media entities in the tpx_sk_sitename theme.
 */

/**
 * Implements hook_preprocess_HOOK() for media_oembed_iframe.
 */
function tpx_sk_sitename_snake_preprocess_media_oembed_iframe(&$variables) {
  if (strpos((string) $variables['media'], 'youtube.com') !== FALSE || strpos((string) $variables['media'], 'youtu.be') !== FALSE) {
    // Make the video auto-play on load.
    $variables['media'] = str_replace('?feature=oembed', '?feature=oembed&autoplay=1', $variables['media']);
  }
}
