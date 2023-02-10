import { Button, Checkbox, Input } from '@fluentui/react-components';
import { memo, useState } from 'react';
import { ITodo, useTodo } from '../store/useTodos';

function TodoItem({ todo }: { todo: ITodo }) {
  const [state, setState] = useState({
    editedText: todo.text,
    editMode: false,
  });
  const { _toggleTodo, editTodo } = useTodo((s) => ({
    _toggleTodo: s.toggleTodo,
    editTodo: s.editTodo,
  }));

  const toggleTodo = () => {
    _toggleTodo(todo.id);
  };

  const openEditMode = () => {
    setState((s) => ({ ...s, editMode: true }));
  };

  const saveTodo = () => {
    editTodo(todo.id, state.editedText);
    setState((s) => ({ ...s, editMode: false }));
  };

  const cancelEdit = () => {
    setState((s) => ({ ...s, editMode: false }));
  };

  const changeEditedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({ ...s, editedText: e.target.value }));
  };

  return (
    <li>
      <div className='flex gap-2 flex-row justify-between transition-all'>
        {state.editMode ? (
          <>
            <Input className='w-full' onChange={changeEditedText} value={state.editedText} />
            <Button appearance='primary' onClick={saveTodo}>
              Save
            </Button>
            <Button onClick={cancelEdit}>Cancel</Button>
          </>
        ) : (
          <>
            <span className={`${todo.isCompleted && 'line-through'}`} onDoubleClick={openEditMode}>
              {todo.text}
            </span>
            <Checkbox onClick={toggleTodo} checked={todo.isCompleted} />
          </>
        )}
      </div>
    </li>
  );
}

export default memo(TodoItem);
