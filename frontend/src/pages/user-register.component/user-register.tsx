import { initialUserState, User } from "../../@types/user.d";

import Main from "../../components/main.component/main";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "../../api/get-users";
import { useState } from "react";
import { createUser } from "../../api/create-user";
import { updateUser } from "../../api/update-user";
import { deleteUser } from "../../api/delete-user";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir.",
};

function UserRegister() {
  const [currentUser, setCurrentUser] = useState<User>(initialUserState);
  const queryClient = useQueryClient();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000,
  });

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync: createUserFn, isPending: isCreatePending } = useMutation(
    {
      mutationKey: ["createUser", users],
      mutationFn: createUser,
      onMutate({ email, name }) {
        const oldUsers = queryClient.getQueryData<User[]>(["users"]);

        queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
          if (oldUsers) {
            const id = oldUsers.length + 1;
            return [...oldUsers, { id, email, name }];
          } else {
            return [{ id: 1, email, name }];
          }
        });

        return { oldUsers };
      },

      onError(_, __, context) {
        if (context?.oldUsers) {
          queryClient.setQueryData(["users"], context.oldUsers);
        }
      },
    }
  );

  const { mutateAsync: updateUserFn, isPending: isUpdatePending } = useMutation(
    {
      mutationKey: ["updateUser", users],
      mutationFn: updateUser,
      onMutate({ id, name, email }) {
        const oldUsers = queryClient.getQueryData<User[]>(["users"]);

        queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
          return oldUsers?.map((user) => {
            if (user.id === id) {
              return { ...user, name, email };
            }

            return user;
          });
        });

        return { oldUsers };
      },
      onError(_, __, context) {
        if (context?.oldUsers) {
          queryClient.setQueryData(["users"], context.oldUsers);
        }
      },
    }
  );

  const { mutateAsync: deleteUserFn } = useMutation({
    mutationKey: ["deleteUser", currentUser],
    mutationFn: deleteUser,
    onMutate({ id }) {
      queryClient.setQueryData<User[]>(["users"], (oldUsers) => {
        return oldUsers?.filter((user) => user.id !== id);
      });
    },
  });

  const saveUser = () => {
    if (currentUser.id) {
      updateUserFn(currentUser);
    } else {
      createUserFn(currentUser);
    }
    setCurrentUser(initialUserState);
  };

  const editUser = (userID: number) => {
    if (users) {
      const userSelected = users.find((user: User) => user.id === userID);
      setCurrentUser((current) => userSelected ?? current);
    }
  };

  const renderForm = () => {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={currentUser.name}
                onChange={(e) => updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={currentUser.email}
                onChange={(e) => updateField(e)}
                placeholder="Digite o e-mail..."
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={saveUser}
              disabled={isUpdatePending || isCreatePending}
            >
              Salvar
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: "10px" }}
              onClick={() => setCurrentUser(initialUserState)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderList = () => {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-warning fa fa-pencil"
                      style={{ marginRight: "10px" }}
                      onClick={() => user.id && editUser(user.id)}
                    ></button>
                    <button
                      className="btn btn-danger fa fa-trash"
                      onClick={() => user.id && deleteUserFn(user)}
                    ></button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                <div
                  className="spinner-border mt-5"
                  style={{ color: "#07072a" }}
                  role="status"
                >
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <Main {...headerProps}>
      {renderForm()}
      {renderList()}
    </Main>
  );
}

export default UserRegister;
