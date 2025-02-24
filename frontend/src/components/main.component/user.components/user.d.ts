export const baseUrl = "https://api-crud-h0ja.onrender.com";

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
