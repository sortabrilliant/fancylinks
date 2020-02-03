/**
 * WordPress dependencies
 */
import { Button, Placeholder } from '@wordpress/components';

const FancyLinksPlaceholder = ( props ) => {
	const { value, onSubmit, onChange } = props;

	return (
		<Placeholder
			icon="share-alt2"
			label="Site URL"
			className="wp-block-embed"
			instructions="Insert a link you'd like to make fancy."
		>
			<form onSubmit={ onSubmit }>
				<input
					type="url"
					value={ value || '' }
					className="components-placeholder__input"
					aria-label="Site URL"
					placeholder="Enter URL here…"
					onChange={ onChange } />
				<Button
					isLarge
					type="submit"
				>
					{ 'Fancy Up' }
				</Button>
			</form>
		</Placeholder>
	);
};

export default FancyLinksPlaceholder;
