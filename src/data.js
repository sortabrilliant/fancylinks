/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import { registerStore } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const actions = {
	setMetdata( url, metadata ) {
		return {
			type: 'SET_METADATA',
			url,
			metadata,
		};
	},

	fetchFromAPI( path ) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
};

registerStore( 'sortabrilliant/fancylinks', {
	reducer( state = {}, action ) {
		switch ( action.type ) {
			case 'SET_METADATA':
				const { url, metadata } = action;
				return {
					...state,
					[ url ]: metadata,
				};
		}

		return state;
	},

	actions,

	selectors: {
		getMetadata( state, url ) {
			return state[ url ];
		},
	},

	controls: {
		FETCH_FROM_API( action ) {
			return apiFetch( { path: action.path } );
		},
	},

	resolvers: {
		*getMetadata( url ) {
			const metadata = yield actions.fetchFromAPI(
				addQueryArgs( '/fancylinks/1.0/proxy', { url } )
			);
			yield actions.setMetdata( url, metadata );
		},
	},
} );
