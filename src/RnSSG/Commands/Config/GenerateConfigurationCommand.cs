using McMaster.Extensions.CommandLineUtils;
using RnCore.Logging;
using RnSSG.Utils;

namespace RnSSG.Commands;

[Command("generate", "g", Description = "Generates initial configuration used by this tool.")]
class GenerateConfigurationCommand
{
  [Option("--source-dir | -s", CommandOptionType.SingleOrNoValue, Description = "Source directory containing your markdown files")]
  public string SourceDir { get; set; } = string.Empty;

  private readonly ILoggerAdapter<GenerateConfigurationCommand> _logger;
  private readonly IConsoleUtils _consoleUtils;

  public GenerateConfigurationCommand(ILoggerAdapter<GenerateConfigurationCommand> logger, IConsoleUtils consoleUtils)
  {
    _logger = logger;
    _consoleUtils = consoleUtils;
  }

  public async Task<int> OnExecuteAsync(CommandLineApplication cla)
  {
    var targetDir = GetTargetDirectory();

    _consoleUtils
      .ClearConsole()
      .InsertBlankLine()
      .DrawTitle("Generate Configuration")
      .InsertBlankLine();

    if (!_consoleUtils.Confirm($"Generate configuration in: {targetDir}"))
      return 0;


    return 0;
  }

  private string GetTargetDirectory()
  {
    if (!string.IsNullOrWhiteSpace(SourceDir))
    {
      if (!Directory.Exists(SourceDir))
        throw new Exception($"Unable to locate requested root directory: {SourceDir}");

      return SourceDir;
    }

    return Environment.CurrentDirectory;
  }
}
