using RnCore.Logging;
using RnSSG.Models;
using RnCore.Abstractions;
using RnSSG.Extensions;
using RnSSG.Models.Metadata;
using RnSSG.Models.Json;

namespace RnSSG.Helpers;

interface IBlogPageHelper
{
  List<BlogPageFile> GetBlogPageFiles(RnSsgConfig config);
  BlogPageFile GetBlogPageFile(RnSsgConfig config, string filePath);
  List<BlogPageListEntry> MapBlogPageListEntries(RnSsgConfig config, List<BlogPageFile> pages);
  void WritePostsJsonFile(RnSsgConfig config, List<BlogPageListEntry> pages);
}

class BlogPageHelper : IBlogPageHelper
{
  private readonly ILoggerAdapter<BlogPageHelper> _logger;
  private readonly IPathAbstraction _path;
  private readonly IMarkdownFileHelper _mdHelper;
  private readonly IDirectoryAbstraction _directory;
  private readonly IJsonHelper _jsonHelper;
  private readonly IFileAbstraction _file;

  public BlogPageHelper(ILoggerAdapter<BlogPageHelper> logger,
    IPathAbstraction path,
    IMarkdownFileHelper mdHelper,
    IDirectoryAbstraction directory,
    IJsonHelper jsonHelper,
    IFileAbstraction file)
  {
    _logger = logger;
    _path = path;
    _mdHelper = mdHelper;
    _directory = directory;
    _jsonHelper = jsonHelper;
    _file = file;
  }

  public List<BlogPageFile> GetBlogPageFiles(RnSsgConfig config)
  {
    var pagesFiles = _directory.GetFiles(config.PagesDir, "*.md", SearchOption.AllDirectories);
    return pagesFiles
      .Select(filePath => GetBlogPageFile(config, filePath))
      .ToList();
  }

  public BlogPageFile GetBlogPageFile(RnSsgConfig config, string filePath)
  {
    if (!filePath.StartsWith(config.PagesDir))
      throw new Exception($"Need to add better path detection logic: {filePath}");

    var relativePath = filePath[config.PagesDir.Length..].Replace("\\", "/");
    var fileName = _path.GetFileNameWithoutExtension(filePath)!;
    var rawMetadata = _mdHelper.ExtractRawMetadata(filePath);
    var metadata = MapMetadata(filePath, rawMetadata);
    return new BlogPageFile(filePath, relativePath, fileName, metadata);
  }

  public List<BlogPageListEntry> MapBlogPageListEntries(RnSsgConfig config, List<BlogPageFile> pages)
  {
    var pageId = 1;
    return pages
      .Select(pageFile => new BlogPageListEntry
      {
        Title = pageFile.FileName,
        Id = pageId++,
        Order = pageFile.Metadata.Order,
        Path = $"/_tabs{pageFile.RelativePath}",
        Layout = pageFile.Metadata.Layout,
      })
      .ToList();
  }

  public void WritePostsJsonFile(RnSsgConfig config, List<BlogPageListEntry> pages)
  {
    var targetFile = _path.Join(config.OutputDir, RnSsgConstants.PagesIndexFile);
    var pagesJson = _jsonHelper.SerializeObject(pages);
    if (_file.Exists(targetFile)) _file.Delete(targetFile);
    _file.WriteAllText(targetFile, pagesJson);
  }

  private BlogPageMetadata MapMetadata(string filePath, string rawMetadata)
  {
    var mapped = new BlogPageMetadata();
    var metadata = _mdHelper.MapMetadataDictionary(filePath, rawMetadata);

    mapped.Icon = metadata.GetStringValue("icon", string.Empty);
    mapped.Order = metadata.GetIntValue("order", 0);
    mapped.Layout = metadata.GetStringValue("layout", "page");

    return mapped;
  }
}
