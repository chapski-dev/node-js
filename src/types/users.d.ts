export type IUser = {
  id: number | string;
  name?: string;
  username: string;
  email: string;
  password: string;
  hashPass: string;
  isMan?: boolean;
  age?: number;
};
