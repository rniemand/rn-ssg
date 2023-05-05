((app) => {
  class PostArchiveList extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const postsIndex = postHelper.postsIndex;

      return (<semanticUIReact.Menu vertical>
        {Object.keys(postsIndex).map(year => {
          const postsCount = Object.keys(postsIndex[year]).reduce((pv, cv) => { return pv += postsIndex[year][cv].length; }, 0);

          return (<semanticUIReact.Dropdown item text={`${year} (${postsCount} posts)`} key={year}>
            <semanticUIReact.Dropdown.Menu>
              <semanticUIReact.Dropdown.Item key={year + '-all'} onClick={() => this.props.onListPostsClick(year, 'all')}>
                Show All Posts
              </semanticUIReact.Dropdown.Item>
              {Object.keys(postHelper.postsIndex[year]).map(month => {
                return (<semanticUIReact.Dropdown.Item key={month} onClick={() => this.props.onListPostsClick(year, month)}>
                  {year}-{month} ({postHelper.postsIndex[year][month].length} posts)
                </semanticUIReact.Dropdown.Item>);
              })}
            </semanticUIReact.Dropdown.Menu>
          </semanticUIReact.Dropdown>);
        })}
      </semanticUIReact.Menu>);
    }
  }

  app.components.PostArchiveList = PostArchiveList;
})(RnSSG);
