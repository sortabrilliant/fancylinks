/**
 * WordPress dependencies
 */
import { IconButton, Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

const FancyLinksControls = ( props ) => {
	const { showEditButton, switchBackToURLInput } = props;

	return (
		<BlockControls>
			<Toolbar>
				{ showEditButton && (
					<IconButton
						className="components-toolbar__control"
						label="Edit URL"
						icon="edit"
						onClick={ switchBackToURLInput }
					/>
				) }
			</Toolbar>
		</BlockControls>
	);
};

export default FancyLinksControls;
