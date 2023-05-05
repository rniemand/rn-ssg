using System.Text;
using RnSSG.Models.Metadata;

namespace RnSSG.Models;

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
