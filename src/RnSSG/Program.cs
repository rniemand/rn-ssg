using RnSSG.Commands;
using System.Reflection;

var assembly = Assembly.GetExecutingAssembly();

return await RootCommand.RunCommandLineAsync(assembly, args);
