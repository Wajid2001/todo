import TodoForm from './components/1_molecules/todoForm';
import TodoMenu from './components/1_molecules/todoMenu';
import TodoList from './components/2_organisms/todoList';

function App() {
  return (
    <div className='prose mx-auto prose-stone p-4'>
      <h1>Todo</h1>

      <div className='flex flex-row gap-2'>
        <TodoForm />

        <TodoMenu />
      </div>

      <TodoList />
    </div>
  );
}

export default App;
