import React, { Component, FormEvent, ChangeEvent } from 'react';
import css from './TodoList.module.css';
import { TodoListMarkup } from './TodoListMarkup';

interface ITodoListProps {}

export interface ITask {
  task: string;
  id: number;
  completed: boolean;
}

interface ITodoListState {
  lastID: number;
  inputValue: string;
  tasks: ITask[];
}

export class TodoList extends Component<ITodoListProps, ITodoListState> {
  state: ITodoListState = {
    lastID: 0,
    inputValue: '',
    tasks: [],
  };

  handlerInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  setID = (): void => {
    this.setState(({ lastID }) => ({
      lastID: lastID + 1,
    }));
  };

  handlerSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { inputValue, lastID } = this.state;

    if (inputValue.trim().length > 1) {
      this.setID();
      this.setState(({ tasks }) => ({
        tasks: [
          ...tasks,
          {
            task: inputValue,
            id: lastID,
            completed: false,
          },
        ],
        inputValue: '',
      }));
    }
  };

  deleteItemFromList = (listId: number): void => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter(({ id }) => id !== listId),
    }));
  };

  handlerChangeCheckboxes = (listId: number): void => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map(item =>
        listId === item.id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  componentDidMount(): void {
    const listFromStorage: string | null = localStorage.getItem('listStory');
    const lastId: string | null = localStorage.getItem('lastId');

    if (listFromStorage && lastId) {
      try {
        const parsedTasks: ITask[] = JSON.parse(listFromStorage);
        const parsedLastId: number = Number(lastId);

        this.setState({ tasks: parsedTasks, lastID: parsedLastId });
      } catch (err) {
        console.error('Error parsing localStorage data:', err);
      }
    }
  }

  componentDidUpdate(_: ITodoListProps, prevState: ITodoListState): void {
    if (this.state.tasks !== prevState.tasks) {
      localStorage.setItem('listStory', JSON.stringify(this.state.tasks));
      localStorage.setItem('lastId', JSON.stringify(this.state.lastID));
    }
  }

  render() {
    const { inputValue, tasks } = this.state;

    return (
      <>
        <form className={css.form} onSubmit={this.handlerSubmit}>
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
          <button className={css.formBtn} type="submit">
            Send
          </button>
        </form>
        <ul className={css.listTodo}>
          <TodoListMarkup
            deleteItem={this.deleteItemFromList}
            listItems={tasks}
            checkBoxFn={this.handlerChangeCheckboxes}
          />
        </ul>
      </>
    );
  }
}
