using McMaster.Extensions.CommandLineUtils;
using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Models;
using RnSSG.Models.Json;
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
  private readonly IJsonHelper _jsonHelper;
  private readonly IPathAbstraction _path;
  private readonly IFileAbstraction _file;

  public GenerateMetadataCommand(ILoggerAdapter<GenerateMetadataCommand> logger,
    IEnvironmentAbstraction environment,
    IDirectoryAbstraction directory,
    IConfigFileService configFileService,
    IJsonHelper jsonHelper,
    IPathAbstraction path,
    IFileAbstraction file)
  {
    _logger = logger;
    _environment = environment;
    _directory = directory;
    _configFileService = configFileService;
    _jsonHelper = jsonHelper;
    _path = path;
    _file = file;
  }

  public async Task<int> OnExecuteAsync()
  {
    var sourceDir = GetSourceDirectory();
    var config = _configFileService.GetConfig(sourceDir);

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
    var postFiles = _directory.GetFiles(config.PostsDir, "*.md", SearchOption.AllDirectories);
    var mappedPosts = postFiles
      .Select(postFilePath => new BlogPostFile(postFilePath, config.PostsDir))
      .ToList();

    var postId = 1;
    var blogPostList = mappedPosts
      .Select(postFile => new BlogPostListEntry
      {
        Title = postFile.Metadata.Title,
        Path = $"/_posts{postFile.RelativePath}",
        Date = postFile.Metadata.DateTimeOffset,
        Description = "nothing to see",
        Tags = postFile.Metadata.Tags,
        // todo: use the correct author here
        Author = "Richard Niemand",
        Id = postId++
      })
      .ToList();

    var targetFile = _path.Join(config.OutputDir, RnSsgConstants.PostsIndexFile);
    var blogPostListJson = _jsonHelper.SerializeObject(blogPostList);

    if (_file.Exists(targetFile)) _file.Delete(targetFile);
    _file.WriteAllText(targetFile, blogPostListJson);
  }

  private void GeneratePagesList(RnSsgConfig config)
  {
    var pagesFiles = _directory.GetFiles(config.PagesDir, "*.md", SearchOption.AllDirectories);
    var blogPageFiles = pagesFiles
      .Select(pagesFile => new BlogPageFile(pagesFile, config.PagesDir))
      .ToList();

    var pageId = 1;
    var blogPageListEntries = blogPageFiles
      .Select(pageFile => new BlogPageListEntry
      {
        Title = pageFile.FileName,
        Id = pageId++,
        Order = pageFile.Metadata.Order,
        Path = $"/_tabs{pageFile.RelativePath}"
      }).ToList();

    var targetFile = _path.Join(config.OutputDir, RnSsgConstants.PagesIndexFile);
    var pagesJson = _jsonHelper.SerializeObject(blogPageListEntries);

    if (_file.Exists(targetFile)) _file.Delete(targetFile);
    _file.WriteAllText(targetFile, pagesJson);
  }
}
