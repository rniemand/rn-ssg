namespace RnSSG.Extensions;

static class DictionaryExtensions
{
  public static string GetStringValue(this Dictionary<string, string> dictionary, string key, string fallback) =>
    !dictionary.ContainsKey(key) ? fallback : dictionary[key];

  public static DateTimeOffset GetDateTimeOffsetValue(this Dictionary<string, string> dictionary, string key) =>
    !dictionary.ContainsKey(key) ? default : DateTimeOffset.Parse(dictionary[key]);

  public static string[] GetStringArray(this Dictionary<string, string> dictionary, string key) =>
    !dictionary.ContainsKey(key) ? Array.Empty<string>() : ExtractArrayItems(dictionary[key]);

  public static bool GetBoolValue(this Dictionary<string, string> dictionary, string key, bool fallback) =>
    !dictionary.ContainsKey(key) ? fallback : bool.Parse(dictionary[key]);

  public static int GetIntValue(this Dictionary<string, string> dictionary, string key, int fallback) =>
    !dictionary.ContainsKey(key) ? fallback : int.Parse(dictionary[key]);

  // Internal methods
  private static string[] ExtractArrayItems(string value)
  {
    if (value is null or "[]")
      return Array.Empty<string>();

    return value[1..][..^1].Split(",", StringSplitOptions.RemoveEmptyEntries);
  }
}
