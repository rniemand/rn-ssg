using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Extensions;
using RnSSG.Models;
using RnSSG.Models.Json;
using RnSSG.Models.Metadata;

namespace RnSSG.Helpers;

interface IBlogPostHelper
{
  List<BlogPostFile> GetBlogPostFiles(RnSsgConfig config);
  BlogPostFile MapBlogPostFile(RnSsgConfig config, string filePath);
  List<BlogPostListEntry> MapBlogPostList(List<BlogPostFile> posts);
  void WritePostsJsonFile(RnSsgConfig config, List<BlogPostListEntry> posts);
}

class BlogPostHelper : IBlogPostHelper
{
  private readonly ILoggerAdapter<BlogPostHelper> _logger;
  private readonly IPathAbstraction _path;
  private readonly IMarkdownFileHelper _mdHelper;
  private readonly IDirectoryAbstraction _directory;
  private readonly IJsonHelper _jsonHelper;
  private readonly IFileAbstraction _file;

  public BlogPostHelper(ILoggerAdapter<BlogPostHelper> logger,
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

  public List<BlogPostFile> GetBlogPostFiles(RnSsgConfig config)
  {
    var postFiles = _directory.GetFiles(config.PostsDir, "*.md", SearchOption.AllDirectories);
    return postFiles
      .Select(filePath => MapBlogPostFile(config, filePath))
      .ToList();
  }

  public BlogPostFile MapBlogPostFile(RnSsgConfig config, string filePath)
  {
    if (!filePath.StartsWith(config.PostsDir))
      throw new Exception($"Need to add better path detection logic: {filePath}");

    var relativePath = filePath[config.PostsDir.Length..].Replace("\\", "/");
    var fileName = _path.GetFileNameWithoutExtension(filePath)!;
    var rawMetadata = _mdHelper.ExtractRawMetadata(filePath);
    var metadata = MapMetadata(filePath, rawMetadata);

    return new BlogPostFile(filePath, relativePath, fileName, metadata);
  }

  public List<BlogPostListEntry> MapBlogPostList(List<BlogPostFile> posts)
  {
    var postId = 1;
    return posts
      .Select(postFile => new BlogPostListEntry
      {
        Title = postFile.Metadata.Title,
        Path = $"/_posts{postFile.RelativePath}",
        Date = postFile.Metadata.DateTimeOffset,
        Description = "nothing to see",
        Tags = postFile.Metadata.Tags,
        // todo: use the correct author here
        Author = "Richard Niemand",
        Id = postId++,
        Categories = postFile.Metadata.Categories
      })
      .ToList();
  }

  public void WritePostsJsonFile(RnSsgConfig config, List<BlogPostListEntry> posts)
  {
    var targetFile = _path.Join(config.OutputDir, RnSsgConstants.PostsIndexFile);
    var blogPostListJson = _jsonHelper.SerializeObject(posts);
    if (_file.Exists(targetFile)) _file.Delete(targetFile);
    _file.WriteAllText(targetFile, blogPostListJson);
  }

  private BlogPostMetadata MapMetadata(string filePath, string rawMetadata)
  {
    var mapped = new BlogPostMetadata();
    var metadata = _mdHelper.MapMetadataDictionary(filePath, rawMetadata);

    mapped.Title = metadata.GetStringValue("title", string.Empty);
    mapped.DateTimeOffset = metadata.GetDateTimeOffsetValue("date");
    mapped.Categories = metadata.GetStringArray("categories");
    mapped.Tags = metadata.GetStringArray("tags");
    mapped.TableOfContents = metadata.GetBoolValue("toc", false);

    return mapped;
  }
}
