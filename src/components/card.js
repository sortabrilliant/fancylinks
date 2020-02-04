
const FancyLinksCard = ( { title, description, image, publisher, url } ) => {
	return (
		<a
			className="fancylinks-card"
			href={ url }
			target="_blank"
			rel="noopener noreferrer"
		>
			{ image && (
				<div className="fancylinks-card__media">
					<img src={ image } alt={ title } className="fancylinks-card__image" />
				</div>
			) }
			<div className="fancylinks-card__info">
				<h3>{ title }</h3>
				{ description && <p>{ description }</p> }
				{ publisher && <span className="fancylinks-card__publisher">{ publisher }</span> }
			</div>
		</a>
	);
};

export default FancyLinksCard;
