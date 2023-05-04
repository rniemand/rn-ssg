((app) => {
	class PostArchiveList extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
      const postHelper = this.props.postHelper;
      const postsIndex = postHelper.postsIndex;
      let expandedYear = false;
      let expandMonth = false;

			return (<ul className="post-archive">
        {Object.keys(postsIndex).map(year => {
          const postsCount = Object.keys(postsIndex[year]).reduce((pv, cv) => { return pv += postsIndex[year][cv].length; }, 0);
          let classes = '';
          if(!expandedYear) { expandedYear = true; classes += 'active'; }

          return (<li key={year}>
            {year} ({postsCount} posts)
            <ul className={classes}>
              {Object.keys(postHelper.postsIndex[year]).map(month => {
                let classes = '';
                if(!expandMonth && expandedYear) { expandMonth = true; classes += 'active'; }

                return(<li key={`${year}-${month}`}>
                  {year}-{month} ({postHelper.postsIndex[year][month].length} posts)
                  <ul className={classes}>
                    {postHelper.postsIndex[year][month].map(postInfo => {
                      return(<li key={postInfo._id} onClick={() => this.props.onPostSelected(postInfo)}>
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
