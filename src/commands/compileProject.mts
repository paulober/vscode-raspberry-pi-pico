import { tasks, window } from "vscode";
import { Command } from "./command.mjs";
import Logger from "../logger.mjs";

export default class CompileProjectCommand extends Command {
  private _logger: Logger = new Logger("CompileProjectCommand");

  public static readonly id = "compileProject";

  constructor() {
    super(CompileProjectCommand.id);
  }

  async execute(): Promise<void> {
    // Get the task with the specified name
    const task = (await tasks.fetchTasks()).find(task => () => {
      console.log(`[TASK] ${task.name}`);

      return task.name === "Compile Project";
    });

    if (task) {
      // Execute the task
      await tasks.executeTask(task);
    } else {
      // Task not found
      this._logger.error("Task 'Compile Project' not found.");
      void window.showErrorMessage("Task 'Compile Project' not found.");
    }

    return;
  }
}
