# yaml-todos
A todo list generator using yaml as input data

#### installation
```
npm install -g yaml-todos
```

#### run
```
[sudo] yaml-todos file_name.yaml
```

#### syntax
The input yaml file must have a 'todos' key. This is simply because the web app is looking for this key when listing the tasks. See below for correct input syntax
```yaml
todos:
  - <name>: <description>
  - <name>: <description>
  - <name>: <description>
  - <name>: <description>
```

#### example
todos.yaml
```yaml
todos:
  - Install: Install this application from npm
  - Write todos: Write a todo list
  - Run: Run the application
```

```
[sudo] yaml-todos -f todos.yaml
```
