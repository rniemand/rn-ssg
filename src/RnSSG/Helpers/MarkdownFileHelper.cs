using System.Text;
using RnCore.Abstractions;
using RnCore.Logging;

namespace RnSSG.Helpers;

interface IMarkdownFileHelper
{
  string ExtractRawMetadata(string filePath);
  string ExtractRawMetadata(string filePath, IEnumerable<string> lines);
  Dictionary<string, string> MapMetadataDictionary(string filePath, string rawMetadata);
  Dictionary<string, string> MapMetadataDictionary(string filePath, string[] metadataLines);
}

class MarkdownFileHelper : IMarkdownFileHelper
{
  private readonly ILoggerAdapter<MarkdownFileHelper> _logger;
  private readonly IFileAbstraction _file;

  public MarkdownFileHelper(ILoggerAdapter<MarkdownFileHelper> logger,
    IFileAbstraction file)
  {
    _logger = logger;
    _file = file;
  }

  public string ExtractRawMetadata(string filePath)
  {
    // todo: use better exception here
    if (!_file.Exists(filePath))
      throw new Exception($"Unable to find file: {filePath}");

    // todo: add this method to file class
    var rawContent = File.ReadAllLines(filePath);
    return ExtractRawMetadata(filePath, rawContent);
  }

  public string ExtractRawMetadata(string filePath, IEnumerable<string> lines)
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
      throw new Exception($"No metadata found in: {filePath}");

    return sb.ToString();
  }

  public Dictionary<string, string> MapMetadataDictionary(string filePath, string rawMetadata) =>
    MapMetadataDictionary(filePath, rawMetadata.Split("\n", StringSplitOptions.RemoveEmptyEntries));

  public Dictionary<string, string> MapMetadataDictionary(string filePath, string[] metadataLines)
  {
    var dictionary = new Dictionary<string,string>(StringComparer.InvariantCultureIgnoreCase);

    foreach (var rawLine in metadataLines)
    {
      if (rawLine.Trim().Length == 0) continue;
      var indexOf = rawLine.IndexOf(":", StringComparison.Ordinal);

      if (indexOf == -1)
        throw new Exception($"Invalid metadata in: {filePath}");

      var key = rawLine[..indexOf].Trim();
      var value = rawLine[(indexOf + 1)..].Trim();
      if (value.StartsWith('\'') && value.EndsWith('\''))
      {
        value = value[1..];
        value = value[..^1];
      }

      dictionary[key] = value;
    }

    return dictionary;
  }
}
