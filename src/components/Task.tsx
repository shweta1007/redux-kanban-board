import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import { RootState } from "../redux/store";
import { Board, Column, ITask } from "../types";

function Task({ colIndex, taskIndex }: any) {
  const { boards } = useSelector((state: RootState) => state.boards);
  const board: Board | any = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col: Column, i: Number) => i === colIndex);
  const task = col.tasks.find((task: ITask, i: Number) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleOnDrag = (e: any) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
