import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyBoard from "./components/EmptyBoard";
import Header from "./components/Header";
import Home from "./components/Home";
import { setBoardActive } from "./redux/boardsSlice";
import { RootState } from "./redux/store";
import { Board } from "./types";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { boards } = useSelector((state: RootState) => state.boards);
  console.log(boards, "====>");
  const activeBoard = boards.find((board: Board) => board.isActive);
  if (!activeBoard && boards.length > 0) dispatch(setBoardActive({ index: 0 }));
  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              setIsBoardModalOpen={setIsBoardModalOpen}
              isBoardModalOpen={isBoardModalOpen}
            />
            <Home />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default App;
