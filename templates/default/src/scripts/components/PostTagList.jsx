((app) => {
	class PostTagList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			const tags = this.props.tags || '';
      if(tags === '') return null;

      const arrTags = tags.replace('[','').replace(']','').split(',');
      if(arrTags.length === 0) return null;

			return (<div className="tag-list">
				Tags: 
				{arrTags.map(tag => {
          return(<span key={tag} className="tag">
            {tag}
          </span>);
        })}
			</div>);
		}
	}

	app.components.PostTagList = PostTagList;
})(RnSSG);
