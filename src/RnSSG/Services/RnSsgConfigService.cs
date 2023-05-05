using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Models;

namespace RnSSG.Services;

interface IConfigFileService
{
  RnSsgConfig GetConfig(string rootDir);
}

class RnSsgConfigService : IConfigFileService
{
  private readonly ILoggerAdapter<RnSsgConfigService> _logger;
  private readonly IPathAbstraction _path;
  private readonly IFileAbstraction _file;
  private readonly IJsonHelper _jsonHelper;

  public RnSsgConfigService(ILoggerAdapter<RnSsgConfigService> logger,
    IPathAbstraction path,
    IFileAbstraction file,
    IJsonHelper jsonHelper)
  {
    _logger = logger;
    _path = path;
    _file = file;
    _jsonHelper = jsonHelper;
  }

  public RnSsgConfig GetConfig(string rootDir)
  {
    var configFilePath = GetConfigFilePath(rootDir);
    var rawJson = _file.ReadAllText(configFilePath);
    var config = _jsonHelper.DeserializeObject<RnSsgConfig>(rawJson);

    if (config == null)
      throw new Exception("Unable to bind configuration!");

    config.FilePath = configFilePath;
    config.RootDir = _path.GetDirectoryName(configFilePath)!;
    config.OutputDir = ProcessPath(config, config.OutputDir);
    config.ContentDir = ProcessPath(config, config.ContentDir);

    return config;
  }


  private string GetConfigFilePath(string srcDir)
  {
    var configFilePath = _path.Join(srcDir, RnSsgConstants.ConfigFileName);

    if (!_file.Exists(configFilePath))
      throw new Exception($"Unable to find configuration file: {configFilePath}");

    return configFilePath;
  }
  
  private string ProcessPath(RnSsgConfig config, string path)
  {
    if (path.StartsWith("./"))
      path = _path.Join(config.RootDir, path.Substring(2));

    return path;
  }
}
