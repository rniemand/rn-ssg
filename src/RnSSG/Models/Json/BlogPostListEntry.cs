using Newtonsoft.Json;

namespace RnSSG.Models.Json;

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

  [JsonProperty("categories")]
  public string[] Categories { get; set; } = Array.Empty<string>();

  [JsonProperty("author")]
  public string Author { get; set; } = string.Empty;

  [JsonProperty("image")]
  public string Image { get; set; } = string.Empty;

  [JsonProperty("id")]
  public int Id { get; set; } = 0;
}
