((app) => {
  class PostToc extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const metadata = this.props.metadata;
      const tocEnabled = (metadata.toc || 'false').toLowerCase() === 'true';
      if(!tocEnabled) return null;

      const toc = this.props.toc;

      return (<div className="toc">
        need to complete
      </div>);
		}
	}

  app.components.PostToc = PostToc;
})(RnSSG);
