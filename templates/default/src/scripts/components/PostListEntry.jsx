((app) => {
  class PostListEntry extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const entry = this.props.entry;
      const dateFormatted = entry.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });

      return (<div className="postlist-entry">
        <div>{entry.title}</div>
        <span>{dateFormatted}</span>
        <div>{entry.description}</div>
        <button onClick={() => this.props.onViewPostClick(entry)}>View Post</button>
      </div>);
    }
  }

  app.components.PostListEntry = PostListEntry;
})(RnSSG);
