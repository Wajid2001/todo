import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface IUseTodo {
  todos: ITodo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
  markAllCompleted: () => void;
  markAllInCompleted: () => void;
}

const useTodo = create(
  persist<IUseTodo>(
    (set) => ({
      todos: [
        { id: '1', text: 'Lets start 🚀', isCompleted: false },
        { id: '2', text: 'Todo List to save time ⏲', isCompleted: false },
        { id: '3', text: 'Complete your first task 📝', isCompleted: true },
      ],

      addTodo: (text: string) =>
        set((state) => ({
          ...state,
          todos: [
            ...state.todos,
            {
              id: uuidv4(),
              text: text,
              isCompleted: false,
            },
          ],
        })),
      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                isCompleted: !todo.isCompleted,
              };
            }
            return todo;
          }),
        })),
      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      editTodo: (id: string, text: string) =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                text,
              };
            }
            return todo;
          }),
        })),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.isCompleted),
        })),

      markAllCompleted: () =>
        set((state) => ({
          todos: state.todos.map((todo) => ({
            ...todo,
            isCompleted: true,
          })),
        })),

      markAllInCompleted: () =>
        set((state) => ({
          todos: state.todos.map((todo) => ({
            ...todo,
            isCompleted: false,
          })),
        })),
    }),
    {
      name: 'todo-storage',
    },
  ),
);

export { useTodo };

