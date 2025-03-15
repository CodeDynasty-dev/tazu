# Tazu - Command-Line Task Manager

Tazu is a minimal, efficient task management CLI designed for developers. It allows you to track tasks, assign priorities, and mark progress directly from the terminal.

## Features
- **Task Tracking**: Add, list, complete, and remove tasks with simple commands.
- **Priority System**: Tasks range from priority **1 (low) to 10 (high)**, with a default of 1.
- **Time Calculation**: Automatically tracks how long tasks have been open.
- **Lightweight & Fast**: No unnecessary dependencies.

## Installation

Install globally using npm:
```sh
npm install -g tazu
```

## Usage

### Add a Task
```sh
tazu add "Optimize database queries" 7
```
- **"Optimize database queries"** → Task description
- **7** → Priority (optional, default is 1)

### List Tasks
```sh
tazu
```
Example Output:
```sh
1.  Optimize database queries
    - Age: 0h 50m
    - Priority: 1
    - Link: N/A
    - Status: Done

2. Review PR #42 
    - Age: 0h 50m
    - Priority: 1
    - Link: https://github.com/torvalds/linux/pull/1170
    - Status: Pending

```

### Mark Task as Done
```sh
tazu done 1
```
- **1** → Task ID

### Delete a Task
```sh
tazu delete 2
```
- **2** → Task ID

### Show Help
```sh
tazu --help
```
 
## Contributing
Pull requests and improvements are welcome.

## License
MIT License © 2025 [Your Name]

