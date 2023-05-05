((app) => {
  const rel = React.createElement.bind(React);
  const domContainer = document.querySelector("#react");
  const root = ReactDOM.createRoot(domContainer);

  app.instance = new app.helpers.AppHelper(ctx => {
    root.render(rel(app.components.AppWrapper, {
      postHelper: ctx.postHelper,
      pageHelper: ctx.pageHelper
    }));
  });
})(RnSSG);
