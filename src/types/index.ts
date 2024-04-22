export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface ITask {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: ITask[];
}

export interface Board {
  name: string;
  isActive: boolean;
  columns: Column[];
}

export type Columns = {
  name: string;
  tasks: ITask[];
};

export type TSubtask = {
  title: string;
  isCompleted: boolean;
};
