import css from './TodoListMarkup.module.css';

export const TodoListMarkup = ({ listItems, deleteItem, checkBoxFn }) => {
  console.log(listItems);
  if (listItems.length > 0) {
    return listItems.map(({ task, id, completed }) => {
      return (
        <li key={id} className={css.listItem}>
			<p className={css.numItem}>{id - 1}.</p>
          <input
            onChange={() => checkBoxFn(id)}
            type="checkbox"
            className={css.taskCheckbox}
            checked={completed}
          />
          <p className={!completed ? css.taskText : css.taskTextCompleted}>
            {task}
          </p>
          <button className={css.btnItem} onClick={() => deleteItem(id)}>
            Delete
          </button>
        </li>
      );
    });
  }
};
