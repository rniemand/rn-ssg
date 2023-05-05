using McMaster.Extensions.CommandLineUtils;
using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Services;

namespace RnSSG.Commands;

[Command("metadata", Description = "Generates metadata for your site.")]
class GenerateMetadataCommand
{
  [Argument(0, "Source site content dir")]
  public string SourceDir { get; set; } = string.Empty;

  private readonly ILoggerAdapter<GenerateMetadataCommand> _logger;
  private readonly IEnvironmentAbstraction _environment;
  private readonly IDirectoryAbstraction _directory;
  private readonly IConfigFileService _configFileService;

  public GenerateMetadataCommand(ILoggerAdapter<GenerateMetadataCommand> logger,
    IEnvironmentAbstraction environment,
    IDirectoryAbstraction directory,
    IConfigFileService configFileService)
  {
    _logger = logger;
    _environment = environment;
    _directory = directory;
    _configFileService = configFileService;
  }

  public async Task<int> OnExecuteAsync()
  {
    var sourceDir = GetSourceDirectory();
    var config = _configFileService.GetConfig(sourceDir);

    Console.WriteLine("will need to generate site metadata");
    Console.WriteLine($"\tSource DIR  : {sourceDir}");
    Console.WriteLine($"\tConfig File : {config.OutputDir}");

    return 0;
  }

  private string GetSourceDirectory()
  {
    // todo: (GetSourceDirectory) extract to helper
    if (string.IsNullOrWhiteSpace(SourceDir))
      return _environment.CurrentDirectory;

    if (!_directory.Exists(SourceDir))
      throw new Exception($"Unable to locate requested root directory: {SourceDir}");

    return SourceDir;
  }
}
