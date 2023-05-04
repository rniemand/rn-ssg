((app) => {
  class PostListEntry extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const entry = this.props.entry;
      const dateFormatted = entry.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });

      console.log(entry)

      return (<div className="postlist-entry">
        <div>{entry.title}</div>
        <span>{dateFormatted}</span>
        <div>{entry.description}</div>
      </div>);
    }
  }

  app.components.PostListEntry = PostListEntry;
})(RnSSG);
