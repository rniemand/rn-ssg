using McMaster.Extensions.CommandLineUtils;
using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Helpers;
using RnSSG.Models;
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
  private readonly IBlogPageHelper _blogPageHelper;
  private readonly IBlogPostHelper _blogPostHelper;

  public GenerateMetadataCommand(ILoggerAdapter<GenerateMetadataCommand> logger,
    IEnvironmentAbstraction environment,
    IDirectoryAbstraction directory,
    IConfigFileService configFileService,
    IBlogPageHelper blogPageHelper,
    IBlogPostHelper blogPostHelper)
  {
    _logger = logger;
    _environment = environment;
    _directory = directory;
    _configFileService = configFileService;
    _blogPageHelper = blogPageHelper;
    _blogPostHelper = blogPostHelper;
  }

  public async Task<int> OnExecuteAsync()
  {
    var sourceDir = GetSourceDirectory();
    var config = _configFileService.GetConfig(sourceDir);
    _logger.LogInformation("Using configuration: {dir}", config.FilePath);

    GeneratePostsList(config);
    GeneratePagesList(config);

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

  private void GeneratePostsList(RnSsgConfig config)
  {
    var postFiles = _blogPostHelper.GetBlogPostFiles(config);
    var postListEntries = _blogPostHelper.MapBlogPostList(config, postFiles);
    _blogPostHelper.WritePostsJsonFile(config, postListEntries);
  }

  private void GeneratePagesList(RnSsgConfig config)
  {
    var pageFiles = _blogPageHelper.GetBlogPageFiles(config);
    var pageListEntries = _blogPageHelper.MapBlogPageListEntries(config, pageFiles);
    _blogPageHelper.WritePostsJsonFile(config, pageListEntries);
  }
}
