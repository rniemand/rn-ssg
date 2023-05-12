((app) => {
  class ViewPage extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const pageHelper = this.props.pageHelper;
      if (!pageHelper.selectedPage) return (<div><h1>No Page Selected</h1></div>);

      return (<div className="page">
        <h1>{pageHelper.selectedPage.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageHelper.currentPageHtml }}></div>
      </div>);
    }
  }

  app.components.ViewPage = ViewPage;
})(RnSSG);
