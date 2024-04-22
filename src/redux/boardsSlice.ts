import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Column, ITask, Subtask } from "../types";
import { data } from "../utils/constants";

interface BoardsState {
  boards: Board[];
}

const initialState: BoardsState = {
  boards: data.boards || [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (
      state,
      action: PayloadAction<{ name: string; newColumns: any[] }>
    ) => {
      console.log(action.payload, "payload is here");
      const isActive = state.boards.length > 0 ? false : true;
      const payload = action.payload;
      const board: Board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.boards.push(board);
    },
    editBoard: (state, action: PayloadAction<any>) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board: Board | any = state.boards.find(
        (board: Board) => board.isActive
      );
      const column: Column | any = board.columns.find(
        (col: Column, index: Number) => index === prevColIndex
      );
      const task: ITask | any = column.tasks.find(
        (task: ITask, index: Number) => index === taskIndex
      );
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter(
        (task: ITask, index: Number) => index !== taskIndex
      );
      const newCol = board.columns.find(
        (col: Column, index: Number) => index === newColIndex
      );
      newCol.tasks.push(task);
    },
    deleteBoard: (state) => {
      const board: Board | any = state.boards.find(
        (board: Board) => board?.isActive
      );
      state.boards.splice(state.boards.indexOf(board), 1);
    },
    setBoardActive: (state, action: PayloadAction<{ index: number }>) => {
      state.boards.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        status: string;
        description: string;
        subtasks: any[];
        newColIndex: number;
      }>
    ) => {
      console.log(action.payload, "payloads");
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const board: Board | any = state.boards.find((board) => board.isActive);
      const column: Column | any = board.columns.find(
        (col: Column, index: Number) => index === newColIndex
      );
      column.tasks.push(task);
    },
    editTask: (
      state,
      action: PayloadAction<{
        title: string;
        status: string;
        description: string;
        subtasks: any[];
        prevColIndex: number;
        newColIndex: number;
        taskIndex: number;
      }>
    ) => {
      const {
        title,
        status,
        description,
        subtasks,
        newColIndex,
        prevColIndex,
        taskIndex,
      } = action.payload;
      const board: Board | any = state.boards.find(
        (board: Board) => board.isActive
      );
      const column: Column | any = board.columns.find(
        (col: Column, index: Number) => index === prevColIndex
      );
      const task: ITask | any = column.tasks.find(
        (task: ITask, index: Number) => index === taskIndex
      );
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter(
        (task: ITask, index: Number) => index !== taskIndex
      );
      const newCol = board.columns.find(
        (col: Column, index: Number) => index === newColIndex
      );
      newCol.tasks.push(task);
    },
    dragTask: (
      state,
      action: PayloadAction<{
        colIndex: number;
        prevColIndex: number;
        taskIndex: number;
      }>
    ) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board: Board | any = state.boards.find(
        (board: Board) => board.isActive
      );
      const prevCol: Column | any = board.columns.find(
        (col: Column, i: Number) => i === prevColIndex
      );
      const task: ITask | any = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns
        .find((col: Column, i: Number) => i === colIndex)
        .tasks.push(task);
    },
    setSubtaskCompleted: (
      state,
      action: PayloadAction<{
        colIndex: number;
        taskIndex: number;
        index: number;
      }>
    ) => {
      const payload = action.payload;
      const board: Board | any = state.boards.find((board) => board.isActive);
      const col: Board | any = board.columns.find(
        (col: Column, i: Number) => i === payload.colIndex
      );
      const task: ITask | any = col.tasks.find(
        (task: ITask, i: Number) => i === payload.taskIndex
      );
      const subtask: Subtask | any = task.subtasks.find(
        (subtask: Subtask, i: Number) => i === payload.index
      );
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (
      state,
      action: PayloadAction<{
        colIndex: number;
        newColIndex: number;
        taskIndex: number;
        status: string;
      }>
    ) => {
      const payload = action.payload;
      const board: Board | any = state.boards.find((board) => board.isActive);
      const columns: Column | any = board.columns;
      const col: Column | any = columns.find(
        (col: Column, i: Number) => i === payload.colIndex
      );
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find(
        (task: ITask, i: Number) => i === payload.taskIndex
      );
      task.status = payload.status;
      col.tasks = col.tasks.filter(
        (task: ITask, i: Number) => i !== payload.taskIndex
      );
      const newCol = columns.find(
        (col: Column, i: Number) => i === payload.newColIndex
      );
      newCol.tasks.push(task);
    },
    deleteTask: (
      state,
      action: PayloadAction<{ colIndex: number; taskIndex: number }>
    ) => {
      const payload = action.payload;
      const board: Board | any = state.boards.find((board) => board.isActive);
      const col = board.columns.find(
        (col: Column, i: Number) => i === payload.colIndex
      );
      col.tasks = col.tasks.filter(
        (task: ITask, i: Number) => i !== payload.taskIndex
      );
    },
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  dragTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
