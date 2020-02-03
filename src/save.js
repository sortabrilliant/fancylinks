/**
 * Internal dependencies
 */
import Card from './components/card';

const save = ( { attributes } ) => {
	return <Card { ...attributes } />;
};

export default save;
