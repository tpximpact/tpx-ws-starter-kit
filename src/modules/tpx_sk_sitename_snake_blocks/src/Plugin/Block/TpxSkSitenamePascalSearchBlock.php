<?php

namespace Drupal\tpx_sk_sitename_snake_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a global site search block.
 *
 * @Block(
 *   id = "tpx_sk_sitename_snake_site_search",
 *   admin_label = @Translation("tpx_sk_sitename: Site Search"),
 *   category = @Translation("tpx_sk_sitename Blocks")
 * )
 */
class TpxSkSitenamePascalSearchBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => '<h2>Site Site Search Block</h2>',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    return 0;
  }

}
