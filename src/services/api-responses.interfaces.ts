export interface ColourResponse {
  id: number;
  createdAt: Date;
  name: string;
  hexCode: string;
  todos: TodoResponse[];
}

export interface TodoResponse {
  id: number;
  createdAt: Date;
  dueDate: Date;
  title: string;
  task: string;
  isComplete: boolean;
  colour: ColourResponse;
}
