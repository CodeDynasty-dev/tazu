#!/usr/bin/env node
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Command } from 'commander';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Task {
  id: number;
  createdAt: number;
  description: string;
  priority: number;
  link?: string;
  done: boolean;
}

const TASKS_FILE = join(__dirname, 'tasks.json');

const program = new Command();

const getTasks = (): Task[] => {
  if (!fs.existsSync(TASKS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf-8'));
};

const saveTasks = (tasks: Task[]) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

const listTasks = () => {
  const tasks = getTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks available.'));
    return;
  }
  const now = Date.now();
  tasks.forEach((task) => {
    const elapsedMs = now - task.createdAt;
    const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    console.log(`${chalk.cyan(task.id)}. ${task.done ? chalk.strikethrough(task.description) : chalk.green(task.description)}
    - Age: ${hours}h ${minutes}m
    - Priority: ${task.priority}
    - Link: ${task.link || 'N/A'}
    - Status: ${task.done ? chalk.green('Done') : chalk.red('Pending')}\n`);
  });
};


const addTask = (description: string, priority: number = 1, link?: string) => {
  if (priority < 1 || priority > 10) {
    console.log(chalk.red('Priority must be between 1 and 10.'));
    return;
  }

  const tasks = getTasks();
  const newTask: Task = {
    id: tasks.length + 1,
    createdAt: Date.now(),
    description,
    priority,
    link,
    done: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(chalk.green('Task added successfully!'));
};

const deleteTask = (id: number) => {
  let tasks = getTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  if (tasks.length === initialLength) {
    console.log(chalk.red('Task not found.'));
    return;
  }
  saveTasks(tasks);
  console.log(chalk.green('Task deleted successfully!'));
};

const markDone = (id: number) => {
  const tasks = getTasks();
  const task = tasks.find(task => task.id === id);
  if (!task) {
    console.log(chalk.red('Task not found.'));
    return;
  }
  task.done = true;
  saveTasks(tasks);
  console.log(chalk.green('Task marked as done!'));
};

program
  .name('tazu')
  .version('1.0.0')
  .action(listTasks)
  .description('A simple task manager CLI tool');

program
  .command('list')
  .description('List all tasks')
  .action(listTasks);

program
  .command('add <description...>')
  .option('-p, --priority <priority>', 'Task priority (1-10)', '1')
  .option('-l, --link <link>', 'Optional link')
  .description('Add a new task')
  .action((descriptionParts, options) => {
    const description = descriptionParts.join(' ');
    addTask(description, parseInt(options.priority, 10), options.link);
  });

program
  .command('delete <id>')
  .description('Delete a task')
  .action((id) => deleteTask(parseInt(id, 10)));

program
  .command('done <id>')
  .description('Mark a task as done')
  .action((id) => markDone(parseInt(id, 10)));

program.parse(process.argv);