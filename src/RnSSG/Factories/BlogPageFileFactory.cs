using RnCore.Logging;
using RnSSG.Models;
using RnCore.Abstractions;
using RnSSG.Helpers;
using RnSSG.Models.Metadata;

namespace RnSSG.Factories;

interface IBlogPageFileFactory
{
  BlogPageFile GetBlogPageFile(RnSsgConfig config, string filePath);
}

class BlogPageFileFactory : IBlogPageFileFactory
{
  private readonly ILoggerAdapter<BlogPageFileFactory> _logger;
  private readonly IPathAbstraction _path;
  private readonly IMarkdownFileHelper _mdHelper;

  public BlogPageFileFactory(ILoggerAdapter<BlogPageFileFactory> logger,
    IPathAbstraction path,
    IMarkdownFileHelper mdHelper)
  {
    _logger = logger;
    _path = path;
    _mdHelper = mdHelper;
  }

  public BlogPageFile GetBlogPageFile(RnSsgConfig config, string filePath)
  {

    //.Select(pagesFile => new BlogPageFile(pagesFile, config.PagesDir))

    if (!filePath.StartsWith(config.PagesDir))
      throw new Exception($"Need to add better path detection logic: {filePath}");

    var relativePath = filePath[config.PagesDir.Length..].Replace("\\", "/");
    var fileName = _path.GetFileNameWithoutExtension(filePath)!;
    var rawMetadata = _mdHelper.ExtractRawMetadata(filePath);
    var metadata = MapMetadata(filePath, rawMetadata);
    return new BlogPageFile(filePath, relativePath, fileName, metadata);
  }

  private static BlogPageMetadata MapMetadata(string filePath, string rawMetadata)
  {
    var mapped = new BlogPageMetadata();
    var lines = rawMetadata.Split("\n", StringSplitOptions.RemoveEmptyEntries);

    foreach (var line in lines)
    {
      var indexOf = line.IndexOf(":", StringComparison.Ordinal);
      if (indexOf == -1)
        throw new Exception($"Invalid metadata in: {filePath}");
      mapped.SetProperty(line[..indexOf], line[(indexOf + 1)..].Trim());
    }

    return mapped;
  }
}
