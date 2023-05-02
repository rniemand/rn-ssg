using System.Globalization;
using System.Reflection;
using McMaster.Extensions.CommandLineUtils;
using McMaster.Extensions.CommandLineUtils.Abstractions;

namespace RnSSG;

static class RnSSGUtils
{
  public static string GetEnvironment()
  {
    var env = "Production";

#if DEBUG
    env = "Development";
#endif
    env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT") ?? env;

    return env;
  }

  public static void SetStandardCulture()
  {
    var culture = (CultureInfo)CultureInfo.InvariantCulture.Clone();

    culture.DateTimeFormat.FullDateTimePattern = "yyyy/MM/dd HH:mm:ss";
    culture.DateTimeFormat.LongDatePattern = culture.DateTimeFormat.ShortDatePattern = "yyyy/MM/dd";

    CultureInfo.CurrentCulture = CultureInfo.CurrentUICulture = CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = culture;
  }

  public static void RegisterMcMasterValueParsers(CommandLineApplication cla, Assembly? assembly = null)
  {
    registerMcMasterValueParsers(cla, Assembly.GetExecutingAssembly());
    if (assembly is not null)
      registerMcMasterValueParsers(cla, assembly);
  }


  // Internal methods
  private static void registerMcMasterValueParsers(CommandLineApplication cla, Assembly assembly)
  {
    foreach (Type ivpt in assembly.GetTypes().Where(t => t.IsClass && !t.IsAbstract && t.IsAssignableTo(typeof(IValueParser))))
      cla.ValueParsers.Add((IValueParser)ivpt.GetConstructor(Type.EmptyTypes)!.Invoke(null));

  }
}
