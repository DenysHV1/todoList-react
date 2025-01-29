import React, { FC } from 'react';
import { TodoList } from './TodoList/TodoList';

export const App: FC = () => {
  return (
    <div className="container">
      <TodoList></TodoList>
    </div>
  );
};
