<?php

namespace Drupal\tpx_sk_subsitename_snake_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a global site header block.
 *
 * @Block(
 *   id = "tpx_sk_subsitename_snake_site_header",
 *   admin_label = @Translation("tpx_sk_subsitename: Site Header"),
 *   category = @Translation("tpx_sk_subsitename Blocks")
 * )
 */
class TpxSkSubSitenamePascalHeaderBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<h2>Subsite Header Block</h2>',
    ];
  }

}
