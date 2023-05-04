((app) => {
  class CurrentPost extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;
      if(!postHelper.currentPost) return null;

      //console.log('postHelper', postHelper.currentPost)

      return (<div dangerouslySetInnerHTML={{ __html: postHelper.currentPost }}></div>);
		}
	}

  app.components.CurrentPost = CurrentPost;
})(RnSSG);
