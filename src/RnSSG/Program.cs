using System.CommandLine;

var delayOption = new Option<int>(
  name: "--delay",
  description: "Delay between lines, specified as milliseconds per character in a line.",
  getDefaultValue: () => 42);

var readCommand = new Command("read", "Read and display the file.")
{
  delayOption,
};

var rootCommand = new RootCommand("Sample app for System.CommandLine");
rootCommand.AddCommand(readCommand);


readCommand.SetHandler(async (delay) =>
  {
    Console.WriteLine($"You got me: {delay}");
  },
  delayOption);

await rootCommand.InvokeAsync(args);

