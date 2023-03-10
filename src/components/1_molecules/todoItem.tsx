import { Button, Checkbox, Input, Tooltip } from '@fluentui/react-components';
import { Delete24Regular } from '@fluentui/react-icons';
import { memo, useState } from 'react';
import { ITodo, useTodo } from '../store/useTodos';

function TodoItem({ todo }: { todo: ITodo }) {
  const [state, setState] = useState({
    editedText: todo.text,
    editMode: false,
  });
  const { _toggleTodo, _deleteTodo, editTodo } = useTodo((s) => ({
    _toggleTodo: s.toggleTodo,
    _deleteTodo: s.deleteTodo,
    editTodo: s.editTodo,
  }));

  const toggleTodo = () => _toggleTodo(todo.id);
  const deleteTodo = () => _deleteTodo(todo.id);
  const openEditMode = () => setState((s) => ({ ...s, editMode: true }));
  const closeEditMode = () => setState((s) => ({ ...s, editMode: false }));

  const saveTodo = () => {
    editTodo(todo.id, state.editedText);
    closeEditMode();
  };

  const changeEditedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({ ...s, editedText: e.target.value }));
  };

  return (
    <li>
      <div className='flex gap-2 flex-row justify-between transition-all'>
        {state.editMode ? (
          <>
            <Input className='w-full' onChange={changeEditedText} value={state.editedText} onSubmit={saveTodo} />

            <Tooltip
              content={state.editedText.length > 0 ? 'Save todo' : 'Todo title cannot be empty'}
              relationship='label'
            >
              <Button appearance='primary' onClick={saveTodo} disabled={state.editedText.length === 0}>
                Save
              </Button>
            </Tooltip>

            <Tooltip content={'Cancel editing todo'} relationship='label'>
              <Button onClick={closeEditMode}>Cancel</Button>
            </Tooltip>

            <Tooltip content='Delete todo' relationship='label'>
              <Button appearance='subtle' icon={<Delete24Regular />} onClick={deleteTodo} />
            </Tooltip>
          </>
        ) : (
          <>
            <span className={`${todo.isCompleted && 'line-through'}`} onDoubleClick={openEditMode}>
              {todo.text}
            </span>

            <Tooltip content={todo.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'} relationship='label'>
              <Checkbox onClick={toggleTodo} checked={todo.isCompleted} />
            </Tooltip>
          </>
        )}
      </div>
    </li>
  );
}

export default memo(TodoItem);
