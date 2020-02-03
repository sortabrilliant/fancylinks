<?php

namespace SortaBrilliant\FancyLinks\Block;

use const SortaBrilliant\FancyLinks\PLUGIN_DIR;
use const SortaBrilliant\FancyLinks\PLUGIN_FILE;

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$asset_filepath = PLUGIN_DIR . '/build/index.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : [
		'dependencies' => [],
		'version'      => false,
	];

	wp_register_script(
		'fancylinks-script',
		plugins_url( 'build/index.js', PLUGIN_FILE ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'fancylinks-style',
		plugins_url( 'src/style.css', PLUGIN_FILE ),
		[],
		$asset_file['version']
	);

	wp_register_style(
		'fancylinks-editor-style',
		plugins_url( 'src/editor.css', PLUGIN_FILE ),
		[],
		$asset_file['version']
	);

	register_block_type( 'sortabrilliant/fancylinks', [
		'editor_script' => 'fancylinks-script',
		'editor_style'  => 'fancylinks-editor-style',
		'style'         => 'fancylinks-style',
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );
