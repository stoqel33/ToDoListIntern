import React, { useState } from "react";
import style from "./add.module.scss";
import { useForm } from "react-hook-form";

const AddTask = ({ addTask }) => {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePriority = (e) => {
    if (e.target.tagName.toUpperCase() === "INPUT") {
      setPriority(e.target.id);
    }
  };

  const handleAddNewTask = () => {
    addTask(name.trim(), priority);
  };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    if (data !== "undefined" && priority !== "") {
      handleAddNewTask();
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.wrapper}>
        <div className={style.wrapperDesc}>
          <span className={style.desc}>Enter the name of the task</span>
          <input
            type="text"
            name="name"
            onChange={handleName}
            className={style.inputAdd}
            ref={register({ required: true }, { name: "name" })}
            placeholder="Your Task"
            value={name}
          />
        </div>
        {errors.name && (
          <span className={style.errorName}>
            You must enter the name of the task
          </span>
        )}
        <div
          name="priority"
          onClick={handlePriority}
          className={style.innerWrapper}
        >
          <div className={style.wrapperDesc}>
            <span className={style.desc}>Choose the priority of the task</span>
          </div>
          <input type="radio" name="priority" id="low" />
          <label htmlFor="low">low</label>
          <input
            type="radio"
            name="priority"
            id="medium"
            defaultChecked={true}
          />
          <label htmlFor="medium">medium</label>
          <input type="radio" name="priority" id="high" />
          <label htmlFor="high">high</label>
        </div>
        <div>
          <button type="submit" className={style.btn}>
            add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
