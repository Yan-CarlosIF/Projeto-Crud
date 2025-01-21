const baseUrl = "http://localhost:3001/users";

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface State {
  user: User;
  list: User[];
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
}

const users = await fetchUsers();

const initialState: State = {
    user: { name: "", email: "" },
    list: [],
};

users.map((data: User) => initialState.list.push(data));

export { baseUrl, initialState, fetchUsers };
