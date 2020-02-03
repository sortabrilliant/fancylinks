/**
 * WordPress dependencies
 */
import { Spinner } from '@wordpress/components';

const FancyLinksLoading = () => (
	<div className="wp-block-fancylinks is-loading">
		<Spinner />
		<p>Fancying things up</p>
	</div>
);

export default FancyLinksLoading;
