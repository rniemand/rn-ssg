namespace RnSSG.Models.Metadata;

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
