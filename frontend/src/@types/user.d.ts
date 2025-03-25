export interface User {
  id: number;
  name: string;
  email: string;
}

export const initialUserState: User = {
  id: undefined,
  name: "",
  email: "",
};
