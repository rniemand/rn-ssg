using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog;
using System.Reflection;
using RnSSG.Extensions;

namespace RnSSG.Commands;

[Command(Description = "Generates static HTML site from markdown files.")]
[Subcommand(
  typeof(GenerateSiteCommand)
)]
class RootCommand
{
  public static async Task<int> RunCommandLineAsync(Assembly assembly, string[] args)
  {
    var cla = createCla(assembly);
    var logger = cla.GetRequiredService<ILogger<RootCommand>>();

    try
    {
      var version = Assembly.GetExecutingAssembly().GetName().Version!.ToString();
      logger.LogDebug("rn-ssg CLI: {version}", version);
      return await cla.ExecuteAsync(args);
    }
    catch (Exception ex)
    {
      logger.LogUnhandledException(ex);
      return 1;
    }
    finally
    {
      LogManager.Shutdown();
      await Console.Out.FlushAsync();
    }
  }

  private static CommandLineApplication<RootCommand> createCla(Assembly assembly)
  {
    var cla = new CommandLineApplication<RootCommand>();

    RnSSGUtils.RegisterMcMasterValueParsers(cla, assembly);

    cla.Conventions
      .UseDefaultConventions()
      .UseConstructorInjection(DIContainer.ServiceProvider);

    return cla;
  }

  public int OnExecute(CommandLineApplication cla)
  {
    cla.ShowHelp();
    return 0;
  }
}
