using Newtonsoft.Json;

namespace RnSSG.Models;

class RnSsgConfig
{
  [JsonProperty("version")]
  public Version Version { get; set; } = new(1, 0, 0);

  [JsonIgnore]
  public string FilePath { get; set; } = string.Empty;

  [JsonIgnore]
  public string RootDir { get; set; } = string.Empty;

  [JsonProperty("contentDir")]
  public string ContentDir { get; set; } = "./site";

  [JsonProperty("outputDir")]
  public string OutputDir { get; set; } = "./output";

  [JsonIgnore]
  public string PostsDir { get; set; } = string.Empty;

  [JsonIgnore]
  public string PagesDir { get; set; } = string.Empty;

  [JsonProperty("defaultAuthor")]
  public string DefaultAuthor { get; set; } = string.Empty;
}
