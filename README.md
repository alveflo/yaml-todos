# yaml-todos
A todo list generator using yaml as input data.

#### installation
This application runs on [node.js](http://nodejs.org) and is installed via node package manager:
```
> (sudo) npm install -g yaml-todos
```

#### run
```
> (sudo) yaml-todos -f file_name.yaml
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
1 - Create a yaml-file containing your todo-list:

*todos.yaml*
```yaml
todos:
  - Install: Install this application from npm
  - Write todos: Write a todo list
  - Run: Run the application
```

2 - Next run the application
```
> (sudo) yaml-todos -f todos.yaml
```
*Problems, linux user? One word: sudo!*

3 - Done! [Image](https://raw.githubusercontent.com/victoralveflo/yaml-todos/master/img/example.png)

#### license
MIT
