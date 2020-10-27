import React from "react";
import AddTask from "./Task/AddTask";
import TaskList from "./TaskList/TaskList";

import style from "./app.module.scss";

class App extends React.Component {
  state = {
    counter: 0,
    tasks: [],
  };

  addNewTask = (name, priority) => {
    const task = {
      id: this.state.counter,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      priority,
      done: false,
      bin: false,
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task],
      counter: prevState.counter + 1,
    }));
  };

  componentDidMount() {
    if (localStorage.getItem("todo") === "undefined") {
      this.setLocalStorage();
    }
    const value = localStorage.getItem("todo");
    let tasks;
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        tasks = parsed;
      }
    } catch (e) {
      tasks = [];
    }

    if (tasks.length > 0) {
      this.setState(() => ({
        tasks,
        counter: tasks.length,
      }));
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.tasks !== this.state.tasks) {
      this.setLocalStorage();
    }
  }

  setLocalStorage = () => {
    localStorage.setItem("todo", JSON.stringify(this.state.tasks));
  };

  handleDoneTask = (id) => {
    const tasks = [...this.state.tasks];
    tasks.forEach((task) => {
      if (task.id === id) {
        task.done === false ? (task.done = true) : (task.done = false);
      }
    });

    this.setState(() => ({
      tasks,
    }));
  };

  handleDeleteTask = (id) => {
    const newTasks = [...this.state.tasks];
    newTasks.splice(
      newTasks.findIndex((task) => task.id === id),
      1
    );

    this.setState(() => ({
      tasks: newTasks,
    }));
  };

  handleToggleDelOn = (id) => {
    const newTasks = [...this.state.tasks];
    newTasks.map((task) => {
      if (task.id === id) {
        task.bin = true;
      }
      return 0;
    });

    this.setState(() => ({
      tasks: newTasks,
    }));
  };

  handleToggleDelOff = (id) => {
    const newTasks = [...this.state.tasks];
    newTasks.map((task) => {
      if (task.id === id) {
        task.bin = false;
      }
      return 0;
    });

    this.setState(() => ({
      tasks: newTasks,
    }));
  };

  render() {
    return (
      <div className={style.wrapper}>
        <h1 className={style.title}>TODO List</h1>
        <AddTask addTask={this.addNewTask} />
        <TaskList
          tasks={this.state.tasks}
          handleDone={this.handleDoneTask}
          handleDeleteTask={this.handleDeleteTask}
          handleToggleDelOn={this.handleToggleDelOn}
          handleToggleDelOff={this.handleToggleDelOff}
        />
      </div>
    );
  }
}

export default App;
