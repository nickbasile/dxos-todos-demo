import React, { useState } from "react";
import { Circle, CheckCircle, X } from "@phosphor-icons/react";

export default function Task({ task, deleteTask }) {
  const [title, setTitle] = useState(task.title);

  const toggleCompleted = () => {
    task.complete = !task.complete;
  };

  const updateTitle = (event) => {
    setTitle(event.target.value);
    task.title = event.target.value;
  };

  return (
    <li className="flex gap-2 items-center text-base text-indigo-100 font-light px-4 py-3.5 border border-indigo-400/30 rounded-xl w-full leading-none tracking-tight transition-all ease-in-out duration-150">
      <button onClick={toggleCompleted}>
        {task.complete ? (
          <CheckCircle size={24} weight="light" />
        ) : (
          <Circle size={24} weight="light" />
        )}
      </button>
      {task.complete ? (
        <span className="line-through opacity-60">{title}</span>
      ) : (
        <input
          type="text"
          value={title}
          onInput={updateTitle}
          className="bg-transparent w-full p-0 border-none focus:outline-none focus:ring-0 rounded-xl ring-0"
        />
      )}

      <button onClick={() => deleteTask(task)} className="ml-auto">
        <X size={16} weight="light" />
      </button>
    </li>
  );
}
