<?php

/**
 * @file
 * Functions to support theming miscellaneous things the tpx_sk_sitename theme.
 */

use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;
use Drupal\node\NodeInterface;
use Drupal\views\Views;

/**
 * Generate a public file url from a media entity id.
 *
 * @param $media_id
 *   The media entity id.
 * @param string $file_field
 *   The field on the media entity that contains the file.
 *   This defaults to `field_media_image` for the `image` media type.
 *
 * @return string
 */
function _tpx_sk_sitename_snake_create_file_url($media_id, $file_field = 'field_media_image') {
  $url = '';

  if ($media_id) {
    $entity_type_manager = Drupal::entityTypeManager();
    $media_storage = $entity_type_manager->getStorage('media');

    $media_entity = $media_storage->load($media_id);
    if ($media_entity instanceof Media) {
      $file_id = $media_entity
        ->get($file_field)
        ->first()
        ->getValue()['target_id'];

      if ($file_id) {
        $file_storage = $entity_type_manager->getStorage('file');
        $file_entity = $file_storage->load($file_id);

        if ($file_entity instanceof File) {
          $url = $file_entity->createFileUrl();
        }
      }
    }
  }

  return $url;
}
