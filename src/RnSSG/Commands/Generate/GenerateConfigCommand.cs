using McMaster.Extensions.CommandLineUtils;
using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Models;
using RnSSG.Utils;

namespace RnSSG.Commands;

[Command("config",  Description = "Generates initial configuration used by this tool.")]
class GenerateConfigCommand
{
  [Argument(0, "Root directory")]
  public string SourceDir { get; set; } = string.Empty;

  private readonly ILoggerAdapter<GenerateConfigCommand> _logger;
  private readonly IConsoleUtils _consoleUtils;
  private readonly IJsonHelper _jsonHelper;
  private readonly IFileAbstraction _file;
  private readonly IPathAbstraction _path;

  public GenerateConfigCommand(ILoggerAdapter<GenerateConfigCommand> logger,
    IConsoleUtils consoleUtils,
    IJsonHelper jsonHelper,
    IFileAbstraction file,
    IPathAbstraction path)
  {
    _logger = logger;
    _consoleUtils = consoleUtils;
    _jsonHelper = jsonHelper;
    _file = file;
    _path = path;
  }

  public async Task<int> OnExecuteAsync(CommandLineApplication _)
  {
    var targetDir = GetTargetDirectory();

    _consoleUtils
      .ClearConsole()
      .InsertBlankLine()
      .DrawTitle("Generate Configuration")
      .InsertBlankLine();

    if (!_consoleUtils.Confirm($"Generate configuration in: {targetDir}"))
      return 0;

    _consoleUtils.InsertBlankLine();

    var configFilePath = _path.Combine(targetDir, RnSsgConstants.ConfigFileName);
    if (_file.Exists(configFilePath))
    {
      if (!_consoleUtils.Confirm($"Configuration file '{configFilePath}' already exists, overwrite it?"))
        return 0;

      _file.Delete(configFilePath);
      _consoleUtils.WriteLine("Removed old configuration file.").InsertBlankLine();
    }

    var config = new RnSsgConfig();
    var configJson = _jsonHelper.SerializeObject(config, true);
    await _file.WriteAllTextAsync(configFilePath, configJson);

    _consoleUtils
      .InsertBlankLine()
      .WriteLine($"Created configuration file: {configFilePath}");

    return 0;
  }

  private string GetTargetDirectory()
  {
    if (string.IsNullOrWhiteSpace(SourceDir))
      return Environment.CurrentDirectory;

    if (!Directory.Exists(SourceDir))
      throw new Exception($"Unable to locate requested root directory: {SourceDir}");

    return SourceDir;
  }
}
