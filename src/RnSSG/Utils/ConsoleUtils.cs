using Console = System.Console;

namespace RnSSG.Utils;

interface IConsoleUtils
{
  IConsoleUtils ClearConsole();
  IConsoleUtils InsertBlankLine();
  IConsoleUtils DrawTitle(string title);
  IConsoleUtils WriteLine(string line);
  bool Confirm(string message);
}

class ConsoleUtils : IConsoleUtils
{
  public IConsoleUtils ClearConsole()
  {
    Console.Clear();
    return this;
  }

  public IConsoleUtils InsertBlankLine()
  {
    Console.WriteLine();
    return this;
  }

  public IConsoleUtils DrawTitle(string title)
  {
    var width = Console.WindowWidth;
    DrawLine(width);
    CenterText(width, title);
    DrawLine(width);
    return this;
  }

  public IConsoleUtils WriteLine(string line)
  {
    Console.WriteLine(line);
    return this;
  }

  public bool Confirm(string message)
  {
    Console.ForegroundColor = ConsoleColor.Yellow;
    Console.WriteLine(message);
    Console.ResetColor();

    for (;;)
    {
      Console.Write("> Y/N : ");
      var input = Console.ReadKey();
      var value = input.KeyChar.ToString().ToLower();
      if (value == "y")
      {
        Console.WriteLine();
        return true;
      }

      if (value == "n")
      {
        Console.WriteLine();
        return false;
      }
      Console.WriteLine();
      Console.ForegroundColor = ConsoleColor.Red;
      Console.WriteLine("[!] Invalid input, please enter 'Y' for YES or 'N' for NO.");
      Console.ResetColor();
    }
  }


  // Internal methods
  private static void DrawLine(int width) => Console.WriteLine(new string('=', width - 2));

  private static void CenterText(int width, string text)
  {
    // TODO: [COMPLETE] (ConsoleUtils.CenterText) Handle text that overflows
    if (text.Length > width - 6)
      throw new Exception("Need to add support for wrapping text now!");

    var padding = new string(' ', (width - 6 - text.Length) / 2);
    Console.WriteLine($"= {padding}{text}{padding} =");
  }
}
