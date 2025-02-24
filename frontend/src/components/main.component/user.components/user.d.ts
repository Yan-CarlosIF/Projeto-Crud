export const baseUrl = "http://localhost:3001/users";

export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface State {
  user: User;
  list: User[];
}

export const initialState: State = {
  user: { name: "", email: "" },
  list: [],
};
