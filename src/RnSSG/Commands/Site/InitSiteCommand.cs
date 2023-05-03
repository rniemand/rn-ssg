using McMaster.Extensions.CommandLineUtils;
using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Models;
using RnSSG.Utils;

namespace RnSSG.Commands;

[Command("init", "i", Description = "Initializes a new site with expected folder structure and configuration.")]
class InitSiteCommand
{
  [Argument(0, "Root directory")]
  public string SourceDir { get; set; } = string.Empty;

  private readonly ILoggerAdapter<InitSiteCommand> _logger;
  private readonly IConsoleUtils _consoleUtils;
  private readonly IDirectoryAbstraction _directory;
  private readonly IJsonHelper _jsonHelper;
  private readonly IFileAbstraction _file;
  private readonly IPathAbstraction _path;

  public InitSiteCommand(ILoggerAdapter<InitSiteCommand> logger,
    IConsoleUtils consoleUtils,
    IDirectoryAbstraction directory,
    IJsonHelper jsonHelper,
    IFileAbstraction file,
    IPathAbstraction path)
  {
    _logger = logger;
    _consoleUtils = consoleUtils;
    _directory = directory;
    _jsonHelper = jsonHelper;
    _file = file;
    _path = path;
  }

  public async Task<int> OnExecuteAsync(CommandLineApplication _)
  {
    var targetDir = GetTargetDirectory();

    _consoleUtils.ClearConsole()
      .InsertBlankLine()
      .DrawTitle("Initialize Site")
      .InsertBlankLine();

    if (!_consoleUtils.Confirm($"Initialize site in directory: {targetDir}"))
      return 0;

    if (!ConfirmDirectoryEmpty(targetDir))
    {
      _consoleUtils.WriteError($"Directory '{targetDir}' is not empty!");
      return 0;
    }

    var siteFileHelper = new SiteFileHelper(_path, targetDir);

    GenerateConfigFile(siteFileHelper);
    PopulateDirectories(siteFileHelper);


    GenerateDirectories(siteFileHelper);


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

  private bool ConfirmDirectoryEmpty(string path)
  {
    var directories = _directory.GetDirectories(path);
    if (directories.Length > 0) return false;
    var files = _directory.GetFiles(path);
    if (files.Length > 0) return false;
    return true;
  }

  private void GenerateConfigFile(ISiteFileHelper helper)
  {
    _logger.LogInformation("Creating configuration file: {path}", helper.ConfigFile);
    _file.WriteAllText(helper.ConfigFile, _jsonHelper.SerializeObject(new RnSsgConfig(), true));
  }

  private static void PopulateDirectories(ISiteFileHelper helper) => helper
    .AddDirectory("site", "{root}", "site")
    .AddDirectory("posts", "{site}", "_posts")
    .AddDirectory("templates", "{site}", "_templates")
    .AddDirectory("pages", "{site}", "_tabs")
    .AddDirectory("assets", "{site}", "assets")
    .AddDirectory("css", "{assets}", "css")
    .AddDirectory("img", "{assets}", "img");

  private void GenerateDirectories(ISiteFileHelper helper)
  {
    foreach (var directory in helper.Directories)
    {
      if (directory.Key is "root" or "./") continue;
      if (_directory.Exists(directory.Value)) continue;
      _logger.LogInformation("Creating directory: {dir}", directory.Value);
      _directory.CreateDirectory(directory.Value);
    }
  }
}
