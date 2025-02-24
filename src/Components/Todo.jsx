import React, { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { BiHide, BiShow } from "react-icons/bi";

const Todo = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [subtask, setSubtask] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    subtasks: [],
    status: "do",
  });

  const handleAddTask = () => {
    setTasks([...tasks, { ...task, subtasks: task.subtasks || [] }]);
    setTask({ title: "", description: "", subtasks: [], status: "do" });
    setShowForm(false);
  };

  // Function to delete task
  const handleDeleteTask = (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1); // Remove the selected task
    setTasks(updatedTasks); // Update state
    setSelectedTask(null); // Close the modal
  };

  const handleAddSubtask = () => {
    if (subtask.trim()) {
      setTask({
        ...task,
        subtasks: [...task.subtasks, { text: subtask, completed: false }],
      });
      setSubtask("");
    }
  };
  const handleDeleteSubtask = (index) => {
    const updatedSubtasks = task.subtasks.filter((_, i) => i !== index);
    setTask({ ...task, subtasks: updatedSubtasks });
  };
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const handleToggleSubtask = (taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].completed =
      !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;
    setTasks(updatedTasks);
  };
  const groupedTasks = {
    do: tasks.filter((task) => task.status === "do"),
    doing: tasks.filter((task) => task.status === "doing"),
    done: tasks.filter((task) => task.status === "done"),
  };

  const statusColors = {
    do: "blue",
    doing: "purple",
    done: "green",
  };

  return (
    <div
      className={`flex h-screen relative transition-colors duration-300 ${
        isDarkMode
          ? "bg-[rgba(4,1,13,0.89)] text-[#f9f9f9]"
          : "bg-[#f9f9f9] text-[#333]"
      }`}
    >
      {/* Sidebar */}
      {isSidebarVisible ? (
        <div
          className={`w-[200px] p-2.5 border-r-[0.1px] border-[rgba(99,97,104,0.93)] border-opacity-90 flex flex-col justify-between shadow-[2px_0_5px_rgba(4,4,4,0.1)] ${
            isDarkMode ? "bg-[rgba(54,51,62,0.92)]" : "bg-[white]"
          }`}
        >
          <span className="flex items-center mt-2.5 ">
            <img
              className="w-[50px] h-[50px] rounded-full mr-3"
              src="src/Components/Images/stars-7437491_1280.png"
              alt=""
            />
            <h2 className="text-2xl">Ranban</h2>
          </span>
          <div className="flex flex-col items-start text-center ">
            <div
              className={`todo-togglebox flex items-center justify-around w-[95%] mb-4 px-[1rem] py-[0.4rem] rounded-lg cursor-pointer ${
                isDarkMode
                  ? "bg-[rgba(4,1,13,0.89)] text-[#f9f9f9]"
                  : "bg-[#bbb] text-[#333]"
              }`}
              onClick={toggleTheme}
            >
              <MdOutlineLightMode
                className={`${isDarkMode ? "text-gray-500" : "text-gray-800"} text-[17px]`}
              />

              {isDarkMode ? (
                <FaToggleOn className="text-[rgba(106,73,227,0.85)] text-[27px]" />
              ) : (
                <FaToggleOff className="text-[rgba(106,73,227,0.85)] text-[27px]" />
              )}

              <MdOutlineDarkMode
                className={`${isDarkMode ? "text-[grey]" : "text-[#333]"} text-[17px]`}
              />
            </div>
            <div
              className={`togglebutton flex items-center text-[0.8rem] p-[10px] mb-8 rounded-md cursor-pointer w-[8.4rem] ${
                isDarkMode
                  ? "bg-transparent text-gray-400"
                  : "bg-gray-200 text-gray-900"
              }`}
              onClick={toggleSidebar}
            >
              {isSidebarVisible ? <BiHide className="mr-2" /> : <BiShow />}
              {isSidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`todoSidebar-container cursor-pointer h-[6rem] flex items-center border-b border-gray-500/50 p-5 shadow-md ${
            isDarkMode ? "bg-[rgba(54,51,62,0.9)]" : "bg-[#ddd]"
          }`}
          onClick={toggleSidebar}
        >
          {/* Sidebar content here */}

          <span> {isSidebarVisible ? <BiHide /> : <BiShow />} </span>
          {/* Sidebar content goes here */}
        </div>
      )}
      {/* Main Content */}
      <div
        className={`flex-1 ${isDarkMode ? "bg-[rgba(9,9,11,0.89)]" : "bg-[#edeefc]"}`}
      >
        <div
          className={`flex justify-between items-center border-b-[0.1px] border-gray-500 border-opacity-90 p-6.5 shadow-[2px_0_6px_rgba(0,0,0,0.2)]
 ${isDarkMode ? "bg-[rgba(54,51,62,0.9)]" : "bg-[#ffffff]"}`}
        >
          <h3 className="text-center text-lg ">Platform Launch</h3>
          <button
            className="todoMain-button bg-[rgba(106,73,227,0.85)] text-[#f9f9f9] text-xs px-[4px] py-[12px] border-none 
  rounded-[25px] cursor-pointer w-[10%]"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add New Task"}
          </button>
        </div>
        <div className="todoForm-container flex justify-center items-center mt-5 border-none">
          {/* Form */}
          {showForm && (
            <div
              className={`todoForm-box p-[22px] rounded-xl border-none w-[30%] flex flex-col fixed top-35 ${
                isDarkMode ? "bg-[rgba(54,51,62,0.92)]" : "bg-[#fff]"
              }`}
            >
              <h3 className="pb-3 font-medium">Add New Task</h3>
              <div className="todoFormInput-box1 flex flex-col justify-center gap-[0.1rem] mb-4">
                {/* Content */}
                <label className="todoForm-label">Title:</label>
                <input
                  className={`todoForm-input1 m-1 p-[10px] rounded-[0.2rem] border border-gray-500 ${
                    isDarkMode
                      ? "bg-[rgba(54,51,62,0.92)] text-white"
                      : "bg-[transparent] text-black"
                  }`}
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  placeholder="Task title"
                />
              </div>
              <div className="todoFormInput-box2  flex flex-col gap-[0.1rem] mb-2 ">
                <label>Description:</label>

                <textarea
                  className={`todoForm-textarea m-1 p-[22px_9px] text-start rounded-sm border border-gray-500 ${
                    isDarkMode
                      ? "bg-[rgba(54,51,62,0.92)] text-white"
                      : "bg-[transparent] text-black"
                  }`}
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                  placeholder="Task description"
                />
              </div>
              <div className="todoFormInput-box3 flex flex-col gap-[0.1rem]">
                <label>Subtasks:</label>
                <input
                  type="text"
                  value={subtask}
                  onChange={(e) => setSubtask(e.target.value)}
                  placeholder="Subtask"
                  className={`todoForm-input2 m-[5px] p-[9px] border border-gray-500 rounded-sm ${
                    isDarkMode
                      ? "bg-[rgba(54,51,62,0.92)] text-white"
                      : "bg-[transparent] text-black"
                  }`}
                />
                <button
                  className={`todoForm-button m-[8px_0px_4px_0px] px-[4px] py-[8px] text-sm rounded-[20px] hover:scale-100 border-none cursor-pointer w-full 
    ${
      isDarkMode
        ? "text-[rgba(125,95,230,0.85)] bg-white"
        : "text-white bg-[#bbb]"
    }`}
                  onClick={handleAddSubtask}
                >
                  + Add New Subtask
                </button>

                {task.subtasks.length > 0 && (
                  <ul className="max-h-18 overflow-y-auto border rounded  p-1 m-2">
                    {task.subtasks.map((sub, index) => (
                      <li
                        className=" flex justify-between items-center  "
                        key={index}
                      >
                        {sub.text}
                        <button
                          onClick={() => handleDeleteSubtask(index)}
                          className="ml-2 p-1  text-[rgba(106,73,227,0.85)] rounded"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="todoForm-input3 flex flex-col mt-1.5">
                <label>Status:</label>
                <select
                  className={`todoForm-select m-[7px] p-[9px] rounded-sm border border-gray-500 
      ${
        isDarkMode
          ? "bg-[rgba(54,51,62,0.92)] text-white"
          : "bg-[transparent] text-gray-700"
      }`}
                  value={task.status}
                  onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                  <option value="do">To Do</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <button
                onClick={handleAddTask}
                className="px-[4px] py-[8px] text-sm w-full rounded-[20px] mt-3 bg-[rgba(106,73,227,0.85)] cursor-pointer text-white"
              >
                Create Task
              </button>
            </div>
          )}
        </div>
        {/* Task Card */}
        <div className="todo-status p-2 flex gap-1">
          {["do", "doing", "done"].map((status) => (
            <div className="todoStatus-container flex-1 p-[4px] " key={status}>
              <p className="pl-[1.2rem] text-center flex items-center justify-start gap-[6px] text-gray-400">
                <span
                  className="todoStatus-span1 w-[10px] h-[10px] rounded-full"
                  style={{ backgroundColor: statusColors[status] }}
                ></span>

                {status.toUpperCase()}
                <span className="font-bold mr-2">
                  ({groupedTasks[status].length})
                </span>
              </p>
              {groupedTasks[status].length !== 0 &&
                groupedTasks[status].map((task, index) => {
                  const completedSubtasks = task.subtasks.filter(
                    (st) => st.completed
                  ).length;
                  const totalSubtasks = task.subtasks.length;
                  return (
                    <div
                      onClick={() => setSelectedTask(task)}
                      className={`todoStatusMain-box relative w-[90%] cursor-pointer rounded-[5px]  text-left py-6 px-5 m-[15px] gap-[2px] shadow-md   ${
                        // isDarkMode ? "bg-gray-400/10" : "bg-[#ddd]"

                        isDarkMode
                          ? "bg-[rgba(54,51,62,0.9)] "
                          : "bg-[#ffffff] text-gray-400"
                      }`}
                      key={index}
                    >
                      <div className="hover:scale-100 hover:opacity-60">
                        <h4
                          className={`font-medium ${
                            isDarkMode ? "text-white" : "text-black"
                          } `}
                        >
                          {task.title}
                        </h4>
                        <p className="text-xs ">
                          {totalSubtasks > 0
                            ? `${completedSubtasks} of ${totalSubtasks} subtasks`
                            : "No subtasks"}
                        </p>
                      </div>

                      {selectedTask && (
                        <div
                          className="fixed inset-0 flex items-center justify-center bg-gray-800  bg-opacity-0.5 z-50 "
                          onClick={() => setSelectedTask(null)} // Closes when clicking outside
                        >
                          <div
                            className={`relative p-8 rounded-[9px] w-[25%] h-[45%] flex flex-col shadow-md ${
                              isDarkMode
                                ? "bg-[rgba(54,51,62,0.92)] text-white"
                                : "bg-white text-black"
                            }`}
                            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
                          >
                            {/* Close Button */}
                            <button
                              className="absolute top-3 right-4 text-2xl font-bold cursor-pointer hover:text-opacity-20 ]"
                              onClick={() => setSelectedTask(null)}
                            >
                              X
                            </button>

                            <h4 className="text-xl font-bold mt-4">
                              {selectedTask.title}
                            </h4>
                            <p className="text-sm  mt-2">
                              {selectedTask.description}
                            </p>

                            <p className="mt-4 text-sm font-bold">
                              Subtasks (
                              {
                                selectedTask.subtasks.filter((s) => s.completed)
                                  .length
                              }{" "}
                              of {selectedTask.subtasks.length})
                            </p>

                            <ul className="mt-4 ">
                              {selectedTask.subtasks.map((st, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="mb-2 flex items-center "
                                >
                                  <input
                                    type="checkbox"
                                    className="mr-2 cursor-pointer"
                                    checked={st.completed}
                                    onChange={() =>
                                      handleToggleSubtask(
                                        tasks.indexOf(selectedTask),
                                        subIndex
                                      )
                                    }
                                  />
                                  <span
                                    className={
                                      st.completed
                                        ? "line-through text-gray-400"
                                        : ""
                                    }
                                  >
                                    {st.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <button
                              className="mt-10 px-4 py-2 bg-[rgba(106,73,227,0.85)] text-white rounded-lg hover:bg-red-600 hover:scale-100 cursor-pointer transition"
                              onClick={() =>
                                handleDeleteTask(tasks.indexOf(selectedTask))
                              }
                            >
                              Delete Task
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
