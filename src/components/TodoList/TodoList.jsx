import { Component } from 'react';
import css from './TodoList.module.css';
import { TodoListMarkup } from './TodoListMarkup';

export class TodoList extends Component {
  state = {
    lastID: 0,
    inputValue: '',
    tasks: [],
  };

  handlerInputValue = e => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  setID = () => {
    this.setState(({ lastID }) => {
      return { lastID: (lastID += 1) };
    });
  };

  handlerSubmit = e => {
    const { inputValue } = this.state;
    e.preventDefault();
    if (inputValue.length > 1) {
      this.setID();
      this.setState(({ tasks }) => ({
        tasks: [
          ...tasks,
          {
            task: inputValue,
            id: this.state.lastID,
            completed: false,
          },
        ],
        inputValue: '',
      }));
      e.currentTarget.reset();
    }
  };

  deleteItemFromList = listId => {
    this.setState(({ tasks }) => {
      return { tasks: tasks.filter(({ id }) => id !== listId) };
    });
  };

  handlerChangeCheckboxes = listId => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map(item =>
          listId === item.id ? { ...item, completed: !item.completed } : item
        ),
      };
    });
  };

  componentDidMount() {
    const listFromStorage = localStorage.getItem('listStory');
    const lastId = localStorage.getItem('lastId');
    if (listFromStorage) {
      try {
        const parsedTasks = JSON.parse(listFromStorage);
        const parsedLastId = Number(JSON.parse(lastId));

        this.setState({ tasks: parsedTasks, lastID: parsedLastId });
      } catch (err) {
        console.error(err);
      }
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.tasks !== prevState.tasks) {
      localStorage.setItem('listStory', JSON.stringify(this.state.tasks));
      localStorage.setItem('lastId', JSON.stringify(this.state.lastID));
    }
  }

  render() {
    const { inputValue, tasks } = this.state;
    return (
      <>
        <form type="submit" className={css.form} onSubmit={this.handlerSubmit}>
          <label className={css.labelContainer}>
            Enter the task
            <input
              type="text"
              className={css.yourTask}
              name="yourTask"
              value={inputValue}
              onChange={this.handlerInputValue}
            />
          </label>
          <button className={css.formBtn}>Send</button>
        </form>
        <ul className={css.listTodo}>
          <TodoListMarkup
            deleteItem={this.deleteItemFromList}
            listItems={tasks}
            checkBoxFn={this.handlerChangeCheckboxes}
          ></TodoListMarkup>
        </ul>
      </>
    );
  }
}
