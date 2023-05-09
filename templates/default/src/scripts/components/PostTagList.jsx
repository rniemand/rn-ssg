((app) => {
	class PostTagList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const tags = this.props.tags || [];
			if (tags.length === 0) return null;

			const showTags = (tag) => {
				app.helpers._urlHelper.setSelectedTagUrl(tag);
			};

			return (<div className="post-tag-list">
				{tags.map(tag => {
					return (<semanticUIReact.Label key={tag} className="tag" as='a' onClick={() => showTags(tag)}>
						<semanticUIReact.Icon name='tag' />
						{tag}
					</semanticUIReact.Label>);
				})}
			</div>);
		}
	}

	app.components.PostTagList = PostTagList;
})(RnSSG);
