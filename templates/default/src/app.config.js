window.RnSSG = window.RnSSG || {};

((app, window) => {
  const createGeneratedConfig = () => {
    const _generated = {
      baseUrl: window.location.href.replace(window.location.hash, '')
    };

    if (_generated.baseUrl.endsWith('/'))
      _generated.baseUrl = _generated.baseUrl.substr(0, _generated.baseUrl.length - 1);

    return _generated;
  };

  app.helpers = {};
  app.components = {};
  app.enums = {};
  app.models = {};
  app.globals = {};
  app.state = {
    layout: 'posts'
  };
  app.instance = null;

  app.enums.LogSeverity = {
    Trace: 0,
    Debug: 1,
    Info: 2,
    Warning: 3,
    Error: 4,
    Fatal: 5,
  };

  app.config = {
    blogName: 'RichardN',
    googleAnalytics: false,
    googleAnalyticsID: 'G-HRDC8SXRVG',
    generated: createGeneratedConfig(),
    postUrlTemplate: '/post/{id}/{year}/{month}/{title}',
    postUrlRegex: new RegExp('\\/post\\/(\\d{1,})\\/\\d{4}\\/'),
    pageUrlTemplate: '/page/{id}/{title}',
    pageUrlRegex: new RegExp('\\/page\\/(\\d{1,})\\/'),
    getTagRegex: new RegExp('\\/page\\/(\\d{1,})\\/[^\\/]+\\/(.*?)$'),
    getTagIndex: 2,
    getCategoryRegex: new RegExp('\\/page\\/(\\d{1,})\\/[^\\/]+\\/(.*?)$'),
    getCategoryIndex: 2,
    pageTagUrlTemplate: '/page/{id}/{title}/{tag}',
    logging: {
      enabled: true,
      logFetch: false,
      logRenderCalls: true,
      minSeverity: app.enums.LogSeverity.Trace,
    }
  };
})(RnSSG, window);

