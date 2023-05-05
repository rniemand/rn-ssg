((app) => {
  class CurrentPage extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const pageHelper = this.props.pageHelper;
      if(!pageHelper.selectedPage) return null;

      return (<div className="page">
        <button onClick={pageHelper.clearSelectedPage}>Post list</button>
        <h1>{pageHelper.selectedPage.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageHelper.currentPageHtml }}></div>
      </div>);
		}
	}

  app.components.CurrentPage = CurrentPage;
})(RnSSG);
