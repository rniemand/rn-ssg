using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RnSSG;

static class DIContainer
{
  private static IServiceProvider ServiceProvider { get; }

  static DIContainer()
  {
    var config = GetConfiguration();

    var serviceCollection = new ServiceCollection()
      .AddSingleton<IConfiguration>(config);

    ServiceProvider = serviceCollection.BuildServiceProvider();
  }

  private static IConfigurationRoot GetConfiguration()
  {
    return new ConfigurationBuilder()
      .Build();
  }
}
