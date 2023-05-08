using Newtonsoft.Json;

namespace RnSSG.Models.Json;

class BlogPageListEntry
{
  [JsonProperty("id")]
  public int Id { get; set; } = 0;

  [JsonProperty("title")]
  public string Title { get; set; } = string.Empty;

  [JsonProperty("path")]
  public string Path { get; set; } = string.Empty;

  [JsonProperty("layout")]
  public string Layout { get; set; } = string.Empty;

  [JsonProperty("order")]
  public int Order { get; set; }
}
