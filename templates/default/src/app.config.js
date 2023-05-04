window.RnSSG = window.RnSSG || {};

((app, window) => {
  const createGeneratedConfig = () => {
    const _generated = {
      baseUrl: window.location.href.replace(window.location.hash, '')
    };
  
    if(_generated.baseUrl.endsWith('/'))
      _generated.baseUrl = _generated.baseUrl.substr(0, _generated.baseUrl.length-1);

    return _generated;
  };

  app.helpers = {};
  app.components = {};
  app.enums = {};
  app.models = {};
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
    generated: createGeneratedConfig(),
    logging: {
      enabled: true,
      logFetch: true,
      minSeverity: app.enums.LogSeverity.Trace,
    }
  };
})(RnSSG, window);

