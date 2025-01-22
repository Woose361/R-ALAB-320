import React from 'react'
import ReactDOM from 'react-dom/client';

const initialState = {
  todos: [],
  editingIndex: null,
  editValue: '',
};

const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
  EDIT_TODO: 'EDIT_TODO',
  SAVE_EDIT: 'SAVE_EDIT',
  DELETE_TODO: 'DELETE_TODO',
  SET_EDIT_VALUE: 'SET_EDIT_VALUE',
};

function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [{ text: action.payload, complete: false }, ...state.todos],
      };
    case ACTIONS.TOGGLE_COMPLETE:
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.index ? { ...todo, complete: !todo.complete } : todo
        ),
      };
    case ACTIONS.EDIT_TODO:
      return {
        ...state,
        editingIndex: action.index,
        editValue: state.todos[action.index].text,
      };
    case ACTIONS.SAVE_EDIT:
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === state.editingIndex ? { ...todo, text: state.editValue } : todo
        ),
        editingIndex: null,
      };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.index),
      };
    case ACTIONS.SET_EDIT_VALUE:
      return { ...state, editValue: action.payload };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
    setNewTodo('');
  };

  const handleToggleComplete = (index) => {
    dispatch({ type: ACTIONS.TOGGLE_COMPLETE, index });
  };

  const handleEdit = (index) => {
    dispatch({ type: ACTIONS.EDIT_TODO, index });
  };

  const handleSaveEdit = () => {
    dispatch({ type: ACTIONS.SAVE_EDIT });
  };

  const handleDelete = (index) => {
    dispatch({ type: ACTIONS.DELETE_TODO, index });
  };

  const handleEditValueChange = (e) => {
    dispatch({ type: ACTIONS.SET_EDIT_VALUE, payload: e.target.value });
  };
};

 return (
  <div>
    <h2>Todo List</h2>

    <div>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>


    <ul>
      {state.todos.map((todo, index) => (
        <li key={index}>
          {state.editingIndex === index ? (

            <div>
              <input
                type="text"
                value={state.editValue}
                onChange={handleEditValueChange}
                placeholder="Edit todo"
              />
              <button onClick={handleSaveEdit}>Save</button>

            </div>

          ) :
            (

              <div>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleToggleComplete(index)}
                />
                <span
                  style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)} disabled={!todo.complete}>
                  Delete
                </button>
              </div>
            )}
        </li>
      ))}
    </ul>
  </div>
);

export default TodoApp;
