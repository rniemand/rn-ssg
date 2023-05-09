((app) => {
  const _config = app.config.logging;
  const Severity = app.enums.LogSeverity;

  class AppLogger {
    renderCall = (caller) => {
      if (!_config.enabled || !_config.logRenderCalls) return;
      console.log(`(RENDER) Caller: ${caller}`);
    };

    debug = (message) => {
      if (!this._canLog(Severity.Debug)) return;
      console.log(`[DEBUG] ${message}`);
    };

    info = (message) => {
      if (!this._canLog(Severity.Info)) return;
      console.log(`[INFO] ${message}`);
    };

    warning = (message) => {
      if (!this._canLog(Severity.Warning)) return;
      console.log(`[WARNING] ${message}`);
    };

    error = (message) => {
      if (!this._canLog(Severity.Error)) return;
      if (message instanceof Error) {
        console.log(message);
      } else {
        console.log(`[ERROR] ${message}`);
      }
    };

    logFetch = (url) => {
      if (!this._canLog(Severity.Info) || !_config.logFetch) return;
      console.log(`Running fetch: ${app.config.generated.baseUrl}${url}`);
    };

    _canLog = (severity) => {
      if (!_config.enabled) return false;
      if (severity < _config.minSeverity) return false;
      return true;
    };
  }

  app.logger = new AppLogger();
})(RnSSG);
