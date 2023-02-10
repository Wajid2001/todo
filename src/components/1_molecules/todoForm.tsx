import { Button, Input } from '@fluentui/react-components';
import { memo, useState } from 'react';
import { useTodo } from '../store/useTodos';

function TodoForm() {
  const [state, setState] = useState({
    title: '',
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
    <div className='flex flex-row gap-2'>
      <Input className='w-full' placeholder='What needs to be done?' onChange={changeTitle} value={state.title} />
      <Button appearance='primary' onClick={addTodo}>
        Add
      </Button>
    </div>
  );
}

export default memo(TodoForm);
