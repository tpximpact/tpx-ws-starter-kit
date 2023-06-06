<?php

namespace Drupal\tpx_sk_subsitename_snake_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a global site footer block.
 *
 * @Block(
 *   id = "tpx_sk_subsitename_snake_site_footer",
 *   admin_label = @Translation("tpx_sk_subsitename: Site Footer"),
 *   category = @Translation("tpx_sk_subsitename Blocks")
 * )
 */
class TpxSkSubSitenamePascalFooterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<h2>tpx_sk_subsitename Footer Block</h2>',
    ];
  }

}
