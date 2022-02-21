import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";

const AddTodo: NextPage = () => {
  const [todo, setTodo] = useState("");
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const store = useSelector((m) => m);
  console.log(store);

  const inputChangeHandler = (e) => {
    if (e.target.value.lenght === 0) {
      return;
    }
    setTodo(e.target.value);
  };

  const addTodoHandler = () => {
    dispatch({ type: "addTodo", payload: { todo: todo, isChecked: checked } });
  };
  return (
    <div>
      <h1>All todos</h1>
      <input type="text" onChange={inputChangeHandler} />
      <button onClick={addTodoHandler}>Add Todo</button>
      <Link href="/">Homepage</Link>
    </div>
  );
};

export default AddTodo;

// todo list with in memory database
// full typescript - OKEY!
// done delete and edit todos
// next js - OKEY!
// can use local storage to save the todos
// different route for new todo - OKEY!
// overview for todos and when u click on a todo it should take u to a new route that has the option to edit the todo
// bonus points for backend with nest js
// antd
// zustand/jotai/redux
