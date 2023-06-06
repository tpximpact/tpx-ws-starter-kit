<?php

namespace Drupal\tpx_sk_sitename_snake_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a global site header block.
 *
 * @Block(
 *   id = "tpx_sk_sitename_snake_site_header",
 *   admin_label = @Translation("tpx_sk_sitename: Site Header"),
 *   category = @Translation("tpx_sk_sitename Blocks")
 * )
 */
class TpxSkSitenamePascalHeaderBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<h2>tpx_sk_sitename Header Block</h2>',
    ];
  }

}
