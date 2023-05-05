((app) => {
  class PostArchiveList extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const postHelper = this.props.postHelper;
      const postsIndex = postHelper.postsIndex;
      const activePostId = postHelper.selectedPost?.id || 0;
      let expandedYear = false;
      let expandMonth = false;

      return (<ul className="post-archive-x">
        {Object.keys(postsIndex).map(year => {
          const postsCount = Object.keys(postsIndex[year]).reduce((pv, cv) => { return pv += postsIndex[year][cv].length; }, 0);
          let classes = '';
          if (!expandedYear) { expandedYear = true; classes += 'active'; }

          return (<li key={year}>
            {year} ({postsCount} posts)
            <ul className={classes}>
              {Object.keys(postHelper.postsIndex[year]).map(month => {
                let classes = '';
                if (!expandMonth && expandedYear) { expandMonth = true; classes += 'active'; }

                return (<li key={`${year}-${month}`}>
                  {year}-{month} ({postHelper.postsIndex[year][month].length} posts)
                  <ul className={classes}>
                    {postHelper.postsIndex[year][month].map(postInfo => {
                      const liClass = postInfo.id === activePostId ? 'active' : '';
                      return (<li key={postInfo.id} className={liClass} onClick={() => this.props.onPostSelected(postInfo)}>
                        {postInfo.title}
                      </li>);
                    })}
                  </ul>
                </li>);
              })}
            </ul>
          </li>);
        })}
      </ul>);
    }
  }

  app.components.PostArchiveList = PostArchiveList;
})(RnSSG);
