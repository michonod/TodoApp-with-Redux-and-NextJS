import { createStore } from "redux";

const todosState: any = [];

const todoReducer = (state = todosState, action: any) => {
  if (action.type === "addTodo") {
    return [
      ...state,
      {
        todo: action.payload.todo,
        id: Math.floor(Math.random() * 100000).toString(),
        isChecked: action.payload.isChecked,
      },
    ];
  }
  if (action.type === "editTodo") {
    const stateId = state[0].id;
    const actionId = action.payload.id;

    const filteredState = state.filter((item) => item.id !== action.payload.id);
    return [
      ...filteredState,
      {
        todo: action.payload.todo,
        id: action.payload.id,
        isChecked: action.payload.isChecked,
      },
    ];
  }
  if (action.type === "deleteTodo") {
    const filteredTodos = state.filter((item) => item.id !== action.payload.id);
    return filteredTodos;
  }
  return state;
};

const store = createStore(todoReducer);

export default store;
