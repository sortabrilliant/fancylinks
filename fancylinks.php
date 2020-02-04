<?php
/**
 * Plugin Name: Fancy Links
 * Plugin URI:  https://sortabrilliant.com/fancylinks/
 * Description: Make your links sorta fancy.
 * Author:      sorta brilliant
 * Author URI:  https://sortabrilliant.com/
 * Version:     1.0.0
 * License:     GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package FancyLinks
 */

namespace SortaBrilliant\FancyLinks;

const PLUGIN_DIR  = __DIR__;
const PLUGIN_FILE = __FILE__;

require_once PLUGIN_DIR . '/inc/parser.php';
require_once PLUGIN_DIR . '/inc/rest-api.php';
require_once PLUGIN_DIR . '/inc/block.php';
