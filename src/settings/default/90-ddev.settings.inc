<?php

/**
 * @file
 * Automatically generated Drupal settings file.
 * ddev manages this file and may delete or overwrite the file unless this
 * comment is removed.  It is recommended that you leave this file alone.
 */

if (empty($_ENV['AH_SITE_ENVIRONMENT']) && getenv('IS_DDEV_PROJECT') == 'true') {
  $host = "db";
  $port = 3306;
  $driver = "mysql";

  // If DDEV_PHP_VERSION is not set but IS_DDEV_PROJECT *is*, it means we're running (drush) on the host,
  // so use the host-side bind port on docker IP
  if (empty(getenv('DDEV_PHP_VERSION') && getenv('IS_DDEV_PROJECT') == 'true')) {
    $host = "127.0.0.1";
    $port = 61250;
  }

  $databases['default']['default'] = [
    'database' => "db",
    'username' => "db",
    'password' => "db",
    'host' => $host,
    'driver' => $driver,
    'port' => $port,
    'prefix' => "",
  ];

  $settings['hash_salt'] = 'OzjtrUWqMUTzcDcjMiuNUYZdNwQhMImbaOudIXuqPXrlvitPtEPPaiYMdWAAlsOy';

  // This will prevent Drupal from setting read-only permissions on sites/default.
  $settings['skip_permissions_hardening'] = TRUE;

  // This will ensure the site can only be accessed through the intended host
  // names. Additional host patterns can be added for custom configurations.
  $settings['trusted_host_patterns'] = ['.*'];

  // Don't use Symfony's APCLoader. ddev includes APCu; Composer's APCu loader has
  // better performance.
  $settings['class_loader_auto_detect'] = FALSE;

  // Set $settings['config_sync_directory'] if not set in settings.php.
  if (empty($settings['config_sync_directory'])) {
    $settings['config_sync_directory'] = 'sites/default/files/sync';
  }

  // Config split.
  $config['config_split.config_split.local_dev']['status'] = TRUE;
  $config['config_split.config_split.dev_stage']['status'] = FALSE;
  $config['config_split.config_split.prod']['status'] = FALSE;

  // Update search index to use local DDEV Solr server.
  $config['search_api.server.acquia_search_api_solr_server']['status'] = FALSE;
  $config['search_api.server.local_ddev_solr_server']['status'] = TRUE;
  $config['search_api.index.main_search_index']['server'] = 'local_ddev_solr_server';
  $config['search_api.index.main_search_index']['status'] = TRUE;
  $config['search_api.index.main_search_index']['read_only'] = FALSE;

  // Private files.
  $settings['file_private_path'] = dirname(DRUPAL_ROOT) . '/private';

  /**
   * Load local development override configuration, if available.
   *
   * Create a settings.local.php file to override variables on secondary (staging,
   * development, etc.) installations of this site.
   *
   * Typical uses of settings.local.php include:
   * - Disabling caching.
   * - Disabling JavaScript/CSS compression.
   * - Rerouting outgoing emails.
   *
   * Keep this code block at the end of this file to take full effect.
   */
  if (file_exists(__DIR__ . '/../settings.local.php')) {
    include __DIR__ . '/../settings.local.php';
  }
}
