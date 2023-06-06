<?php
/**
 * @file
 * Functions to support theming paragraphs in tpx_sk_sitename_snake theme.
 */

use Drupal\media\Entity\Media;

/**
 * Implements template_preprocess_paragraph().
 */
function tpx_sk_sitename_snake_preprocess_paragraph(&$variables) {
  /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
  $paragraph = $variables['paragraph'];
  /** @var \Drupal\Core\Entity\ContentEntityBase $parent_entity */
  $parent_entity = $paragraph->getParentEntity();
  $padding_top = $paragraph->hasField('field_padding_top') ? $paragraph->get('field_padding_top')->value : NULL;
  $padding_bottom = $paragraph->hasField('field_padding_bottom') ? $paragraph->get('field_padding_bottom')->value : NULL;

  if ($paragraph->getType() === 'from_library' && $paragraph->field_reusable_paragraph->entity) {
    $library_item = $paragraph->field_reusable_paragraph->entity;

    if ($library_item->access('view')) {
      $view_builder = \Drupal::entityTypeManager()
        ->getViewBuilder('paragraphs_library_item');
      $library_item_render_array = $view_builder->view($library_item, $variables['elements']['field_reusable_paragraph'][0]['#view_mode']);

      $build = $view_builder->build($library_item_render_array);
      if (!empty($build['paragraphs'])) {
        // Pass values from library paragraph instance to global paragraph.
        /** @var \Drupal\paragraphs\Entity\Paragraph $library_paragraph */
        $library_paragraph = $build['paragraphs'][0]['#paragraph'];
        if ($library_paragraph->hasField('field_padding_top')) {
          $library_paragraph->set('field_padding_top', $padding_top);
        }

        if ($library_paragraph->hasField('field_padding_bottom')) {
          $library_paragraph->set('field_padding_bottom', $padding_bottom);
        }

        $library_paragraph->updateOriginalValues();
        $variables['content'] = $build['paragraphs'];
      }
    }
  }

  $variables['tpx_sk_sitename_snake_para_parent'] = $parent_entity;
  $variables['padding_top'] = $padding_top;
  $variables['padding_bottom'] = $padding_bottom;

  $node = \Drupal::request()->attributes->get('node');

  if(isset($node)) {
    $variables['node_title'] = $node->getTitle();
  }
}

/**
 * Implements hook_preprocess_paragraph__HOOK()
 */
function tpx_sk_sitename_snake_preprocess_paragraph__partner_logo(&$variables) {
  $paragraph = $variables['paragraph'];
  $parent_field = $paragraph->get('parent_field_name');
  $parent_field_name = $parent_field->getString();

  // Add variables to use small variant for this field only.
  if($parent_field_name == 'field_event_partner_logos') {
    $variables["partner_logo_variation"] = 'small';
  }
}

/**
 * Implements hook_preprocess_paragraph__HOOK()
 */
function tpx_sk_sitename_snake_preprocess_paragraph__download(&$variables) {

  $paragraph = $variables['paragraph'];
  $document_id = $paragraph->get('field_downloadable_document')->getString();

  if($document_id) {
    $media_entity = Media::load($document_id);
    $media_entity_file = $media_entity->field_media_document->entity;

    // Get the filesize of the downloadable document and format as per design.
    $filesize = $media_entity_file->get('filesize')->getString();
    $formatted_filesize = $filesize / 100;
    $variables["file_size"] = $formatted_filesize;

    // Get the file mime so we can work out the file type.
    $filemime = $media_entity_file->get('filemime')->getString();
    $variables["file_type"] = '';

    // Only these three file types are supported.
    switch($filemime) {
      case "application/pdf":
        $variables["file_type"] = 'pdf';
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        $variables["file_type"] = 'docx';
        break;
      case "application/msword":
        $variables["file_type"] = 'doc';
        break;
    }
  }
}

/**
 * Implements hook_preprocess_paragraph__HOOK()
 */
function tpx_sk_sitename_snake_preprocess_paragraph__video(&$variables) {

  $paragraph = $variables['paragraph'];
  $media_id = $paragraph->get('field_video')->getString();

  if ($media_id) {
    $media_entity = Media::load($media_id);

    // Derive a thumbnail image + alt text.
    $url = $media_entity->get('field_media_oembed_video')->getString();

    // youtube.com vs youtu.be -- both are valid.
    $needle = strpos($url, 'youtube.com') !== FALSE ? '?v=' : 'youtu.be/';
    $embed_code = substr($url, strpos($url, $needle) + strlen($needle));

    $variables['media_thumbnail'] = "//i.ytimg.com/vi_webp/$embed_code/maxresdefault.webp";
    $variables['media_thumbnail_legacy'] = "//i.ytimg.com/vi/$embed_code/maxresdefault.jpg";
  }
}
