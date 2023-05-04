((app) => {
  class CurrentPost extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;
      if(!postHelper.currentPost) return null;

      console.log('postHelper', postHelper.currentPost)

      return (<div>
        <p>more to come</p>
      </div>);
		}
	}

  app.components.CurrentPost = CurrentPost;
})(RnSSG);
