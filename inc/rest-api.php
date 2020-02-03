<?php
/**
 * Code is based on WP_oEmbed_Controller.
 *
 * @see https://developer.wordpress.org/reference/classes/wp_oembed_controller.
 */

namespace SortaBrilliant\FancyLinks\RestApi;

use WP_Error;
use WP_REST_Server;
use SortaBrilliant\FancyLinks\Parser;

/**
 * Register Fancy Links REST API route.
 *
 * @return void
 */
function register_routes() {
	register_rest_route(
		'fancylinks/1.0',
		'/proxy',
		[
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => __NAMESPACE__ . '\\get_proxy_item',
				'permission_callback' => __NAMESPACE__ . '\\permissions_check',
				'args'                => [
					'url' => [
						'description'       => 'The URL of the resource for which to fetch meta data.',
						'type'              => 'string',
						'required'          => true,
						'sanitize_callback' => 'esc_url_raw',
					],
				],
			]
		]
	);
}
add_action( 'rest_api_init', __NAMESPACE__ . '\\register_routes' );

/**
 * Checks if current user can make a proxy Fancy Links request.
 *
 * @return true|WP_Error
 */
function permissions_check() {
	if ( ! current_user_can( 'edit_posts' ) ) {
		return new WP_Error( 'rest_forbidden', 'Sorry, you are not allowed to make proxied oEmbed requests.', [ 'status' => rest_authorization_required_code() ] );
	}

	return true;
}

/**
 * Callback for Fancy Links proxy item.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return object|WP_Error
 */
function get_proxy_item( $request ) {
	$url = $request['url'];

	// Serve metadata from cache.
	$cache_key = 'fancy_' . md5( $url );
	$metadata  = get_transient( $cache_key );
	if ( ! empty( $metadata ) ) {
		return $metadata;
	}

	$metadata = Parser\get_remote_metadata( $url );

	if ( empty( $metadata ) ) {
		return false;
	}

	set_transient( $cache_key, $metadata, DAY_IN_SECONDS );

	return $metadata;
}
