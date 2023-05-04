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
  app.config = {
    generated: createGeneratedConfig(),
    logging: {
      enabled: true,
      logFetch: true,
    }
  };
})(RnSSG, window);

