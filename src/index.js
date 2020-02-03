/**
 * Internal dependencies
 */
import './data';
import edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

const { name, category, attributes } = metadata;

registerBlockType( name, {
	title: 'Fancy Links',
	description: '',
	icon: 'share-alt2',
	keywords: [ 'embed' ],
	category,
	attributes,
	edit,
	save,
} );
