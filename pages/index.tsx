import type { NextPage } from "next";
import Link from "next/link";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent } from "react";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  type Todos = {
    id: string;
    isChecked: boolean | undefined;
    todo: string;
  }[];

  const [addActive, setAddActive] = useState(false);
  const [todo, setTodo] = useState("");
  let todos = useSelector((todo: Todos) => todo);

  const deleteTodoHandler = (e: React.FormEvent) => {
    const id = (e.target as Element).id;
    //FIX THIS
    dispatch({ type: "deleteTodo", payload: { id: id } });
  };

  //ADD NEW TODO HANDLER
  const addNewTodoHandler = () => {
    setAddActive(true);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      //FIX THIS
      return;
    }
    setTodo(e.target?.value);
    //FIX THIS
  };

  const addTodoHandler = () => {
    if (todo.length === 0) {
      return;
    }
    dispatch({
      type: "addTodo",
      payload: { todo: todo },
    });
  };

  return (
    <div className="homeContainer">
      <h1>All todos</h1>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id} className="todoContainer">
            <h1
              className={
                !todo.isChecked ? "todoHeading" : "todoHeading striked"
              }
              key={todo.id}
            >
              {todo.todo}
            </h1>
            <Link href={`/${todo.id}`}>
              <button className="deleteButton editButton">Edit todo </button>
            </Link>
            <button
              className="deleteButton"
              id={todo.id}
              onClick={deleteTodoHandler}
            >
              Delete todo
            </button>
          </div>
        ))}
      </ul>
      {addActive && (
        <div className="activeAddForm">
          <input type="text" onChange={inputChangeHandler} />
          <Button size="large" type="primary" onClick={addTodoHandler}>
            Add Todo
          </Button>
        </div>
      )}
      {
        <Button
          block={true}
          size="large"
          type="default"
          onClick={addNewTodoHandler}
        >
          Add new todo
        </Button>
      }
    </div>
  );
};

export default Home;

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
