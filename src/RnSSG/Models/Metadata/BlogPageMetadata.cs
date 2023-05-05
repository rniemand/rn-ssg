namespace RnSSG.Models.Metadata;

class BlogPageMetadata
{
  public string Icon { get; set; } = string.Empty;
  public int Order { get; set; } = 0;

  public void SetProperty(string key, string value)
  {
    switch (key.ToLower().Trim())
    {
      case "icon": Icon = value; break;
      case "order": Order = int.Parse(value); break;
      default: return;
    }
  }
}
