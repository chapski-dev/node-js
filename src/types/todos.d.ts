export interface ITodo {
  id: number | string; // (UUID)
  title: string;
  isCompleted : boolean;
  idUser:string // (UUID)
}
