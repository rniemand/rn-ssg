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

  [JsonProperty("author")]
  public string Author { get; set; } = string.Empty;
  // todo: add support for author metadata

  [JsonProperty("id")]
  public int Id { get; set; } = 0;
}
