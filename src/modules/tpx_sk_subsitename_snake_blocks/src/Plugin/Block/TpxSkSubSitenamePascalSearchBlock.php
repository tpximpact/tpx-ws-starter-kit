<?php

namespace Drupal\tpx_sk_subsitename_snake_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a global site search block.
 *
 * @Block(
 *   id = "tpx_sk_subsitename_snake_site_search",
 *   admin_label = @Translation("tpx_sk_subsitename: Site Search"),
 *   category = @Translation("tpx_sk_subsitename Blocks")
 * )
 */
class TpxSkSubSitenamePascalHeaderBlockSearchBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<h2>Subsite Search Block</h2>',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    return 0;
  }

}
