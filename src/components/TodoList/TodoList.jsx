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
    console.log(e.currentTarget.value);
    this.setState({ inputValue: e.currentTarget.value });
  };

  setID = () => {
    this.setState(prevState => {
      return { lastID: (prevState.lastID += 1) };
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.setID();

    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        {
          task: this.state.inputValue,
          id: this.state.lastID,
          completed: false,
        },
      ],
      inputValue: '',
    }));
    e.currentTarget.reset();
  };

  deleteItemFromList = listId => {
    this.setState(prevState => {
      return { tasks: prevState.tasks.filter(({ id }) => id !== listId) };
    });
  };

  handlerChangeCheckboxes = listId => {
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.map(item =>
          listId === item.id ? { ...item, completed: !item.completed } : item
        ),
      };
    });
  };

  render() {
    return (
      <>
        <form type="submit" className={css.form} onSubmit={this.handlerSubmit}>
          <label className={css.labelContainer}>
            Enter the task
            <input
              type="text"
              className={css.yourTask}
              name="yourTask"
              value={this.state.inputValue}
              onChange={this.handlerInputValue}
            />
          </label>
          <button className={css.formBtn}>Send</button>
        </form>
        <ul
          className={
            this.state.tasks.length > 0 ? css.listTodo : css.listTodoOff
          }
        >
          <TodoListMarkup
            deleteItem={this.deleteItemFromList}
            listItems={this.state.tasks}
            checkBoxFn={this.handlerChangeCheckboxes}
          ></TodoListMarkup>
        </ul>
      </>
    );
  }
}
