/**
 * Internal dependencies
 */
import Card from './card';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class FancyLinksPreview extends Component {
	constructor() {
		super( ...arguments );
		this.hideOverlay = this.hideOverlay.bind( this );
		this.state = {
			interactive: false,
		};
	}

	static getDerivedStateFromProps( nextProps, state ) {
		if ( ! nextProps.isSelected && state.interactive ) {
			return { interactive: false };
		}

		return null;
	}

	hideOverlay() {
		this.setState( { interactive: true } );
	}

	render() {
		const { data } = this.props;
		const { interactive } = this.state;

		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return (
			<>
				<Card { ...data } />
				{ ! interactive && <div
					className="fancylinks__interactive-overlay"
					onMouseUp={ this.hideOverlay } /> }
			</>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	}
}

export default FancyLinksPreview;
