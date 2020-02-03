<?php

namespace SortaBrilliant\FancyLinks\Parser;

use DOMDocument;
use function wp_remote_get;
use function wp_remote_retrieve_body;
use function wp_remote_retrieve_response_code;
use function libxml_use_internal_errors;

/**
 * Tiny parser for site meta tags.
 *
 * @param string $html     HTML of the site.
 * @return array $metadata Site meta data, if exists.
 */
function parse( $html ) {
	$metadata = [];
	$rules = [
		'description' => [ 'og:description', 'description' ],
		'image'       => [ 'og:image', 'og:image:url', 'twitter:image' ],
		'title'       => [ 'og:title', 'twitter:title', 'twitter:text:title' ],
		'publisher'   => [ 'og:site_name' ],
	];

	$libxml_error = libxml_use_internal_errors( true );

	$document = new DOMDocument();
	$document->loadHTML( $html );

	libxml_use_internal_errors( $libxml_error );

	$metatags = $document->getElementsByTagName( 'meta' );

	if ( ! $metatags || $metatags->length === 0) {
		return $metadata;
	}

	// It's so ugly. But works fast :shrug:
	foreach ( $metatags as $meta ) {

		foreach ( $rules as $name => $values ) {

			if ( $meta->hasAttribute('property')
				&& in_array( $meta->getAttribute('property' ), $values, true )
				) {
					$metadata[ $name ] = $meta->getAttribute('content');
					continue 2;
				}

			if ( $meta->hasAttribute('name')
				&& in_array( $meta->getAttribute('name' ), $values, true )
				) {
					$metadata[ $name ] = $meta->getAttribute('content');
					continue 2;
				}
		}
	}

	return $metadata;
}

/**
 * Retrieve the remote site's metadata.
 *
 * @param string      $url The site URL.
 * @return bool|array      Metadata array. False on failure.
 */
function get_remote_metadata( $url ) {
	$response  = wp_remote_get( $url );
	$http_code = wp_remote_retrieve_response_code( $response );

	if ( $http_code !== 200 ) {
		return [];
	}

	$metadata = parse( wp_remote_retrieve_body( $response ) );

	return $metadata;
}
