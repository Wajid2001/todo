import { Button, Input, Tooltip } from '@fluentui/react-components';
import { memo, useState } from 'react';
import { useTodo } from '../store/useTodos';

function TodoForm() {
  const [state, setState] = useState({
    title: 'What needs to be done?',
  });

  const _addTodo = useTodo((s) => s.addTodo);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      title: e.target.value,
    });
  };

  const addTodo = () => {
    _addTodo(state.title);

    setState({
      title: '',
    });
  };

  return (
    <div className='flex flex-row gap-2 w-full'>
      <Input className='w-full' onChange={changeTitle} value={state.title} />

      <Tooltip content={state.title.length > 0 ? 'Add todo' : 'Todo title cannot be empty'} relationship='label'>
        <Button appearance='primary' onClick={addTodo} disabled={state.title.length === 0}>
          Add
        </Button>
      </Tooltip>
    </div>
  );
}

export default memo(TodoForm);
