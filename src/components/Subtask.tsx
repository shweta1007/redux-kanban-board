import { useDispatch, useSelector } from "react-redux";
import { setSubtaskCompleted } from "../redux/boardsSlice";
import { RootState } from "../redux/store";
import { Board, Column, ITask, TSubtask } from "../types";

function Subtask({ index, taskIndex, colIndex }: any) {
  const dispatch = useDispatch();
  const { boards } = useSelector((state: RootState) => state.boards);
  const board: Board | any = boards.find(
    (board: Board) => board.isActive === true
  );
  const col = board.columns.find((col: Column, i: Number) => i === colIndex);
  const task = col.tasks.find((task: ITask, i: Number) => i === taskIndex);
  const subtask = task.subtasks.find(
    (subtask: TSubtask, i: Number) => i === index
  );
  const checked = subtask.isCompleted;

  const onChange = (e: any) => {
    dispatch(setSubtaskCompleted({ index, taskIndex, colIndex }));
  };

  return (
    <div className=" w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
      <input
        className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={checked && " line-through opacity-30 "}>{subtask.title}</p>
    </div>
  );
}

export default Subtask;
