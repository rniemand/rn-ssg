((app) => {
  class ViewPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const pageHelper = this.props.pageHelper;
      if (!pageHelper.selectedPage) return null;
      if (app.state.layout === 'archives') return null;
      if (app.state.layout === 'categories') return null;
      if (app.state.layout === 'tags') return null;

      return (<div className="page">
        <button onClick={pageHelper.clearSelectedPage}>Post list</button>
        <h1>{pageHelper.selectedPage.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageHelper.currentPageHtml }}></div>
      </div>);
    }
  }

  app.components.ViewPage = ViewPage;
})(RnSSG);
