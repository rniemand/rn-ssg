class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return rel("div", {}, "Hello World!");
  }
}