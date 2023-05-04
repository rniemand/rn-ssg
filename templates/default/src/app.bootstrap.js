((app) => {
  const rel = React.createElement.bind(React);

  const site = new app.helpers.AppHelper(() => {
    console.log('can bootstrap the application now...');
  });

  const postHelper = new app.helpers.PostHelper();

  const domContainer = document.querySelector("#react");
  const root = ReactDOM.createRoot(domContainer);
  root.render(rel(app.components.AppWrapper, {postHelper}));
})(RnSSG);
