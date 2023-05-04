((app) => {
  const rel = React.createElement.bind(React);

  new app.helpers.AppHelper(ctx => {
    const domContainer = document.querySelector("#react");
    const root = ReactDOM.createRoot(domContainer);

    root.render(rel(app.components.AppWrapper, {
      postHelper: ctx.postHelper
    }));
  });
})(RnSSG);
