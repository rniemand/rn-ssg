using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using RnCore.Abstractions;
using RnCore.Logging;
using RnSSG.Utils;

namespace RnSSG;

static class DIContainer
{
  public static IServiceProvider ServiceProvider { get; }

  static DIContainer()
  {
    var config = GetConfiguration();

    var serviceCollection = new ServiceCollection()
      .AddSingleton<IConfiguration>(config)
      .AddLogging(loggingBuilder =>
      {
        // configure Logging with NLog
        loggingBuilder.ClearProviders();
        loggingBuilder.SetMinimumLevel(LogLevel.Trace);
        loggingBuilder.AddNLog("nlog.config");
      })
      .AddSingleton<IConsoleUtils, ConsoleUtils>()
      .AddSingleton<IJsonHelper, JsonHelper>()
      .AddSingleton<IFileAbstraction, FileAbstraction>()
      .AddSingleton<IDirectoryAbstraction, DirectoryAbstraction>()
      .AddSingleton<IPathAbstraction, PathAbstraction>()
      .AddSingleton(typeof(ILoggerAdapter<>), typeof(LoggerAdapter<>));

    ServiceProvider = serviceCollection.BuildServiceProvider();
  }

  private static IConfigurationRoot GetConfiguration()
  {
    return new ConfigurationBuilder()
      .Build();
  }
}
