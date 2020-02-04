/**
 * Internal dependencies
 */
import Card from './components/card';
import Controls from './components/controls';
import Loading from './components/loading';
import Placeholder from './components/placeholder';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

class TinyLinkEdit extends Component {
	constructor() {
		super( ...arguments );
		this.setMeta = this.setUrl.bind( this );
		this.switchBackToURLInput = this.switchBackToURLInput.bind( this );
		this.handleMergingAttributes = this.handleMergingAttributes.bind( this );

		this.state = {
			fetching: false,
			editingURL: false,
			url: this.props.attributes.url,
		};

		if ( this.props.metadata ) {
			this.handleMergingAttributes();
		}
	}

	handleMergingAttributes() {
		const { metadata, attributes, setAttributes } = this.props;

		setAttributes( { ...attributes, ...metadata } );
	}

	componentDidUpdate( prevProps ) {
		const hasMeta = undefined !== this.props.metadata;
		const hadMeta = undefined !== prevProps.metadata;
		const metaChanged =
			prevProps.metadata &&
			this.props.metadata &&
			this.props.metadata.title !== prevProps.metadata.title;
		const switchedMeta = metaChanged || ( hasMeta && ! hadMeta );
		const switchedURL = this.props.attributes.url !== prevProps.attributes.url;

		if ( switchedMeta || switchedURL ) {
			this.handleMergingAttributes();
		}
	}

	setUrl( event ) {
		if ( event ) {
			event.preventDefault();
		}

		const { url } = this.state;
		const { setAttributes } = this.props;
		this.setState( { editingURL: false, fetching: true } );
		setAttributes( { url } );
	}

	switchBackToURLInput() {
		this.setState( { editingURL: true } );
	}

	render() {
		const { url, fetching, editingURL } = this.state;
		const { attributes, metadata } = this.props;
		const { title } = attributes;

		if ( ! metadata && fetching ) {
			return <Loading />;
		}

		if ( ! title || editingURL ) {
			return (
				<Placeholder
					onSubmit={ this.setMeta }
					value={ url }
					onChange={ ( event ) => this.setState( { url: event.target.value } ) }
				/>
			);
		}

		return (
			<>
				<Controls
					showEditButton={ url }
					switchBackToURLInput={ this.switchBackToURLInput }
				/>
				<Card { ...attributes } />
			</>
		);
	}
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { url } = ownProps.attributes;
		const { getMetadata } = select( 'sortabrilliant/fancylinks' );
		const metadata = undefined !== url && getMetadata( url );

		return {
			metadata,
		};
	} ),
] )( TinyLinkEdit );
