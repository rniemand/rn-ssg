using System.Text;
using McMaster.Extensions.CommandLineUtils;
using Newtonsoft.Json;
using RnCore.Abstractions;
using RnCore.Logging;
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

class BlogPageFile
{
  public string FilePath { get; }
  public string RelativePath { get; set; }
  public string FileName { get; set; }
  public BlogPageMetadata Metadata { get; set; }

  public BlogPageFile(string path, string basePath)
  {
    FilePath = path;
    FileName = Path.GetFileNameWithoutExtension(path);

    if (!path.StartsWith(basePath))
      throw new Exception($"Need to add better path detection logic: {FilePath}");
    RelativePath = path[basePath.Length..].Replace("\\", "/");

    var rawContent = File.ReadAllLines(path);
    var rawMetadata = ExtractRawMetadata(rawContent);
    Metadata = MapMetadata(rawMetadata);
  }

  private string ExtractRawMetadata(IEnumerable<string> lines)
  {
    var foundStart = false;
    var sb = new StringBuilder();

    foreach (var line in lines)
    {
      switch (foundStart)
      {
        case false when line.Trim() == "---":
          foundStart = true;
          continue;
        case false:
          continue;
      }

      if (line.Trim() == "---") break;
      sb.AppendLine(line);
    }

    if (!foundStart)
      throw new Exception($"No metadata found in: {FilePath}");

    return sb.ToString();
  }

  private BlogPageMetadata MapMetadata(string rawMetadata)
  {
    var mapped = new BlogPageMetadata();
    var lines = rawMetadata.Split("\n", StringSplitOptions.RemoveEmptyEntries);

    foreach (var line in lines)
    {
      var indexOf = line.IndexOf(":", StringComparison.Ordinal);
      if (indexOf == -1)
        throw new Exception($"Invalid metadata in: {FilePath}");
      mapped.SetProperty(line[..indexOf], line[(indexOf + 1)..].Trim());
    }

    return mapped;
  }
}

class BlogPostFile
{
  public string FilePath { get; }
  public string RelativePath { get; set; }
  public BlogPostMetadata Metadata { get; set; }

  public BlogPostFile(string path, string basePath)
  {
    FilePath = path;

    if (!path.StartsWith(basePath))
      throw new Exception($"Need to add better path detection logic: {FilePath}");
    RelativePath = path[basePath.Length..].Replace("\\", "/");

    var rawContent = File.ReadAllLines(path);
    var rawMetadata = ExtractRawMetadata(rawContent);
    Metadata = MapMetadata(rawMetadata);
  }

  private string ExtractRawMetadata(IEnumerable<string> lines)
  {
    var foundStart = false;
    var sb = new StringBuilder();

    foreach (var line in lines)
    {
      switch (foundStart)
      {
        case false when line.Trim() == "---":
          foundStart = true;
          continue;
        case false:
          continue;
      }

      if (line.Trim() == "---") break;
      sb.AppendLine(line);
    }

    if (!foundStart)
      throw new Exception($"No metadata found in: {FilePath}");

    return sb.ToString();
  }

  private BlogPostMetadata MapMetadata(string rawMetadata)
  {
    var mapped = new BlogPostMetadata();
    var lines = rawMetadata.Split("\n", StringSplitOptions.RemoveEmptyEntries);

    foreach (var line in lines)
    {
      var indexOf = line.IndexOf(":", StringComparison.Ordinal);
      if (indexOf == -1)
        throw new Exception($"Invalid metadata in: {FilePath}");
      mapped.SetProperty(line[..indexOf], line[(indexOf + 1)..].Trim());
    }

    return mapped;
  }
}

class BlogPageMetadata
{
  public string Icon { get; set; } = string.Empty;
  public int Order { get; set; } = 0;

  public void SetProperty(string key, string value)
  {
    switch (key.ToLower().Trim())
    {
      case "icon": Icon = value; break;
      case "order": Order = int.Parse(value); break;
      default: return;
    }
  }
}

class BlogPostMetadata
{
  public string Title { get; set; } = string.Empty;
  public DateTimeOffset DateTimeOffset { get; set; }
  public string[] Categories { get; set; } = Array.Empty<string>();
  public string[] Tags { get; set; } = Array.Empty<string>();
  public bool TableOfContents { get; set; }

  public void SetProperty(string key, string value)
  {
    switch (key.ToLower().Trim())
    {
      case "title": Title = value; break;
      case "date":
        DateTimeOffset = DateTimeOffset.Parse(value);
        break;
      case "categories":
        Categories = ExtractArrayItems(value);
        break;
      case "tags":
        Tags = ExtractArrayItems(value);
        break;
      case "toc":
        TableOfContents = bool.Parse(value);
        break;
      default: return;
    }
  }

  private static string[] ExtractArrayItems(string value)
  {
    if (value is null or "[]")
      return Array.Empty<string>();

    return value[1..][..^1].Split(",", StringSplitOptions.RemoveEmptyEntries);
  }
}

class BlogPageListEntry
{
  [JsonProperty("id")]
  public int Id { get; set; } = 0;

  [JsonProperty("title")]
  public string Title { get; set; } = string.Empty;

  [JsonProperty("path")]
  public string Path { get; set; } = string.Empty;

  [JsonProperty("order")]
  public int Order { get; set; }
}

class BlogPostListEntry
{
  [JsonProperty("title")]
  public string Title { get; set; } = string.Empty;

  [JsonProperty("path")]
  public string Path { get; set; } = string.Empty;

  [JsonProperty("date")]
  public DateTimeOffset Date { get; set; }

  [JsonProperty("description")]
  public string Description { get; set; } = string.Empty;

  [JsonProperty("tags")]
  public string[] Tags { get; set; } = Array.Empty<string>();

  [JsonProperty("author")]
  public string Author { get; set; } = string.Empty;
  // todo: add support for author metadata

  [JsonProperty("id")]
  public int Id { get; set; } = 0;
}
