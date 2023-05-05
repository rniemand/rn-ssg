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

    Console.WriteLine("Will need to generate site metadata");
    Console.WriteLine($"\tSource DIR  : {sourceDir}");
    Console.WriteLine($"\tConfig File : {config.OutputDir}");

    GeneratePostsList(config);

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
    var blogPostList = new List<BlogPostListEntry>();
    foreach (var postFile in mappedPosts)
    {
      blogPostList.Add(new BlogPostListEntry
      {
        Title = postFile.Metadata.Title,
        Path = $"/_posts{postFile.RelativePath}",
        Date = postFile.Metadata.DateTimeOffset,
        Description = "nothing to see",
        Tags = postFile.Metadata.Tags,
        // todo: use the correct author here
        Author = "Richard Niemand",
        Id = postId++
      });
    }

    var targetFile = _path.Join(config.OutputDir, RnSsgConstants.PostsIndexFile);
    var blogPostListJson = _jsonHelper.SerializeObject(blogPostList, true);

    if(_file.Exists(targetFile)) _file.Delete(targetFile);
    _file.WriteAllText(targetFile, blogPostListJson);
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
      throw new Exception($"Need to add better path detection logic");
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
