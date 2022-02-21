import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "antd";

const CurrentTodoPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  type Todos = {
    id: string;
    isChecked: boolean | undefined;
    todo: string;
  }[];

  let todos = useSelector((todos: Todos) => todos);
  const todoId = router.query.todoId;

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todo_list"));
    if (storageTodos) {
      todos = storageTodos;
    }
  }, []);

  const currentTodoObj = todos
    .filter((item) => item.id.toString() === todoId)
    .map((item) => item);

  const currentTodo = currentTodoObj.map((item) => item.todo)[0];

  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(currentTodo);
  const [isChecked, setIsChecked] = useState(false);

  const editTodoHandler = () => {
    setEdit(true);
  };

  const saveTodoHandler = () => {
    dispatch({
      type: "editTodo",
      payload: {
        todo: editedTodo,
        isChecked: isChecked,
        id: currentTodoObj[0].id,
      },
    });
  };

  const inputChangeHandler = (e: React.FormEvent) => {
    setEditedTodo(e.target.value);
    // FIX THIS
  };

  const markTodoHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="editTodoContainer">
      <h1>{editedTodo}</h1>
      {edit && (
        <div>
          {isChecked && <h4>Todo is done!</h4>}
          <Button
            className="markedButton"
            type="primary"
            size="large"
            onClick={markTodoHandler}
          >
            Mark the Todo as Done!
          </Button>
          <Button
            className="saveTodoBtn"
            size="large"
            type="primary"
            onClick={saveTodoHandler}
          >
            Save todo
          </Button>
        </div>
      )}
      {edit && (
        <input type="text" onChange={inputChangeHandler} value={editedTodo} />
      )}
      {!edit && (
        <Button
          className="editBtn"
          size="large"
          type="dashed"
          onClick={editTodoHandler}
        >
          Edit todo
        </Button>
      )}
      <Button type="primary" block={true} className="allTodosBtn">
        <Link href="/">All todos Page</Link>
      </Button>
    </div>
  );
};

export default CurrentTodoPage;
