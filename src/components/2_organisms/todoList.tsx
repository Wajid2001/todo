import { memo } from 'react';
import TodoItem from '../1_molecules/todoItem';
import { useTodo } from '../store/useTodos';

function TodoList() {
  const todos = useTodo((s) => s.todos);

  return (
    <div>
      {todos.length === 0 ? (
        <h4 className='text-center'>No Todo </h4>
      ) : (
        <ol className='list-decimal'>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ol>
      )}
    </div>
  );
}

export default memo(TodoList);
