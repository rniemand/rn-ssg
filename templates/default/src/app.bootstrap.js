((app) => {
  const rel = React.createElement.bind(React);
  const postHelper = new app.helpers.PostHelper();

  console.log('ReactDOM', ReactDOM)

  const domContainer = document.querySelector("#react");
  const root = ReactDOM.createRoot(domContainer);
  root.render(rel(app.components.AppWrapper, {postHelper}));

})(RnSSG);