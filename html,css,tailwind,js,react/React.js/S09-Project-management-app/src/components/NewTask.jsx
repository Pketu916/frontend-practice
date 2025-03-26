import React, { useState } from "react";

export default function NewTask({ onAdd }) {
  const [enteredtask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }
  function handleClick() {
    if (enteredtask.trim() === "") {
      return;
    }
    onAdd(enteredtask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4 ">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200 "
        onChange={handleChange}
        value={enteredtask}
      />
      <button
        onClick={handleClick}
        className="text-stone-700 hover:text-red-950"
      >
        task
      </button>
    </div>
  );
}
