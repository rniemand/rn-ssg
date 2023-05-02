using Microsoft.Extensions.DependencyInjection;
using RnCore.Logging;
using RnSSG;

var logger = DIContainer.ServiceProvider.GetRequiredService<ILoggerAdapter<Program>>();

Console.WriteLine("Hello world");

logger.LogInformation("Hello world!");

