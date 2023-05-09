namespace RnSSG.Models.Metadata;

class BlogPostMetadata
{
  public string Title { get; set; } = string.Empty;
  public DateTimeOffset DateTimeOffset { get; set; }
  public string[] Categories { get; set; } = Array.Empty<string>();
  public string[] Tags { get; set; } = Array.Empty<string>();
  public bool TableOfContents { get; set; }
  public string Author { get; set; } = string.Empty;
}
