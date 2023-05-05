using System.Text;
using RnCore.Abstractions;
using RnCore.Logging;

namespace RnSSG.Helpers;

interface IMarkdownFileHelper
{
  string ExtractRawMetadata(string filePath);
  string ExtractRawMetadata(string filePath, IEnumerable<string> lines);
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
}
