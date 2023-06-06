<?php

/**
 * @file
 * Functions to support theming form layout in the tpx_sk_sitename theme.
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function tpx_sk_subsitename_snake_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $element = !empty($variables['element']) ? $variables['element'] : [];
  foreach ($element['#theme'] as $theme) {
    $suggestions[] = "form__{$theme}";
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_input(&$variables) {
  $element = $variables['element'];
  $variables['type'] = $element['#attributes']['type'] ?? $element['#type'];
  $variables['name'] = $element['#attributes']['name'] ?? $element['#name'];
  $variables['value'] = $element['#attributes']['value'] ?? $element['#value'];
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function tpx_sk_subsitename_snake_theme_suggestions_input_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];
  $theme_hook = $variables['theme_hook_original'];

  $name = !empty($element['#name']) ? $element['#name'] : FALSE;
  if ($name) {
    $suggestions[] = "{$theme_hook}__{$name}";
  }

  $context = !empty($element['#context']) ? $element['#context'] : FALSE;
  if ($context) {
    $view_id = !empty($context['#view_id']) ? $context['#view_id'] : FALSE;
    $display_id = !empty($context['#display_id']) ? $context['#display_id'] : FALSE;

    if ($view_id) {
      $suggestions[] = "{$theme_hook}__{$view_id}__{$name}";

      if ($display_id) {
        $suggestions[] = "{$theme_hook}__{$view_id}__{$display_id}__{$name}";
      }
    }
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_checkboxes(&$variables) {
  $variables['label'] = $variables['element']['#title'] ?? '';
  $variables['required'] = $variables['required'] ?? $variables['element']['#required'] ?? '';
}

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_radios(&$variables) {
  $variables['label'] = $variables['element']['#title'] ?? '';
  $variables['required'] = $variables['required'] ?? $variables['element']['#required'] ?? '';
}

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_form_element(&$variables) {
  $variables['required'] = $variables['required'] ?? $variables['element']['#required'] ?? '';
}

/**
 * Implements hook_preprocess_HOOK().
 */
function tpx_sk_subsitename_snake_preprocess_fieldset(&$variables) {
  $variables['label'] = $variables['element']['#title'] ?? '';
  $variables['required'] = $variables['required'] ?? $variables['element']['#required'] ?? '';
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function tpx_sk_subsitename_snake_theme_suggestions_fieldset_alter(array &$suggestions, array $variables) {
  $type = $variables['element']['#type'] ?? '';
  if ($type) {
    $suggestions[] = "{$variables['theme_hook_original']}__{$type}";
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function tpx_sk_subsitename_snake_theme_suggestions_container_alter(array &$suggestions, array $variables) {
  $type = $variables['element']['#type'] ?? '';
  if ($type) {
    $suggestions[] = "{$variables['theme_hook_original']}__{$type}";
  }
}

function tpx_sk_subsitename_snake_form_alter(&$form, $form_state, $form_id) {
  $form['actions']['submit']['#attributes']['class'][] = 'a-button';
}
