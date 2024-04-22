import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragTask } from "../redux/boardsSlice";
import { RootState } from "../redux/store";
import { Board, Columns, ITask } from "../types";
import { colors } from "../utils/constants";
import Task from "./Task";
function Column({ colIndex }: any) {
  const dispatch = useDispatch();
  const [color, setColor] = useState<any>(null);
  const { boards } = useSelector((state: RootState) => state.boards);
  const board: Board | any = boards.find(
    (board: Board) => board.isActive === true
  );

  const col = board.columns.find(
    (col: Columns, idx: Number) => idx === colIndex
  );
  console.log(col);
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleDrop = (e: any) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  };

  const handleDragOver = (e: React.ChangeEvent<any>) => e.preventDefault();

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color} `} />
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task: ITask, index: Number) => (
        <Task taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
