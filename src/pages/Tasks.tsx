import { Expando, useIdentity, useSpaces, useQuery } from "@dxos/react-client";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Task from "../components/Task";

export const Tasks = () => {
  const [title, setTitle] = useState("");
  // Get the user to log in before a space can be obtained.
  const identity = useIdentity();
  // Get the first available space, created with the identity.
  const [space] = useSpaces();

  const tasks = useQuery(space, { type: "tasks" });

  useEffect(() => {
    if (space && !tasks) {
      const tasks = new Expando({ type: "tasks" });
      space.db.add(tasks);
    }
  }, [space, tasks]);

  const createTask = async (event) => {
    event.preventDefault();

    if (!title) return;

    space?.db.add(
      new Expando({
        id: await nanoid(10),
        title: title,
        complete: false,
        type: "tasks",
      })
    );

    setTitle("");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const deleteTask = (task) => {
    space.db.remove(task);
  };

  return (
    <main className="bg-gradient-to-b from-neutral-950 to-indigo-950 min-h-screen flex justify-center items-center p-8">
      <section className="border border-indigo-400/20 rounded-2xl p-12 w-full max-w-xl">
        {tasks && (
          <ul className="gap-4 flex flex-col">
            {tasks.map((task) => (
              <Task task={task} key={task.id} deleteTask={deleteTask} />
            ))}
          </ul>
        )}
        <form
          onSubmit={createTask}
          className={tasks && tasks.length > 0 ? "mt-4" : ""}
        >
          <input
            placeholder="What needs to be done?"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            className="text-base text-indigo-100 placeholder:text-indigo-100/60 font-light px-4 py-3.5 border border-indigo-400/30 rounded-xl w-full bg-transparent focus:outline-none focus:ring-0 focus:border-indigo-400/60 focus:bg-indigo-800/20 leading-none tracking-tight"
          />
        </form>
      </section>
    </main>
  );
};
