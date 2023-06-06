<?php

namespace Drupal\tpx_sk_sitename_snake_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a global site footer block.
 *
 * @Block(
 *   id = "tpx_sk_sitename_snake_site_footer",
 *   admin_label = @Translation("tpx_sk_sitename: Site Footer"),
 *   category = @Translation("tpx_sk_sitename Blocks")
 * )
 */
class TpxSkSitenamePascalFooterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<h2>tpx_sk_sitename Footer Block</h2>',
    ];
  }

}
