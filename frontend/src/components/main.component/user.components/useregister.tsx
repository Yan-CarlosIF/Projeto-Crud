import { baseUrl, initialState, State, User } from "./userdefinitions";
import { useState } from "react";
import Main from "../main";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir.",
};

function userRegister() {
  const [user, setUser] = useState<State>(initialState);

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      user: {
        ...user.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  const clear = () => {
    setUser((state) => {
      return {
        ...state,
        user: initialState.user,
      };
    });
  };

  const saveUser = () => {
    if ("id" in user.user) {
      setUser((state) => {
        return {
          ...state,
          list: state.list.map((u: User) =>
            u.id === user.user.id ? user.user : u),
        };
      });

      fetch(`${baseUrl}/${user.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.user),
      })
        .then((response) => response.json())
        .then(clear);
    } else {
      user.user.id = (user.list.length + 1).toString();

      setUser((state) => {
        return {
          ...state,
          list: [...state.list, user.user],
        };
      });

      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.user),
      })
        .then((response) => response.json())
        .then(clear);
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
                value={user.user.name}
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
                value={user.user.email}
                onChange={(e) => updateField(e)}
                placeholder="Digite o e-mail..."
              />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={saveUser}>
              Salvar
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: "10px" }}
              onClick={clear}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const deleteUser = (userID: string) => {
    fetch(`${baseUrl}/${userID}`, { method: "DELETE" })
      .then(() => {
        const updatedList = user.list.filter(
          (user: User) => user.id !== userID
        );

        setUser({
          ...user,
          list: updatedList,
        });
      })
      .catch((err) => console.log("Erro ao excluir o usuário", err));
  };

  const editUser = (userID: string) => {
    const userSelected = user.list.filter(
      (user: User) => user.id === userID
    )[0];

    setUser({
      ...user,
      user: userSelected,
    });
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
          {user.list.map((user: any) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-warning fa fa-pencil"
                    style={{ marginRight: "10px" }}
                    onClick={() => editUser(user.id)}
                  ></button>
                  <button
                    className="btn btn-danger fa fa-trash"
                    onClick={() => deleteUser(user.id)}
                  ></button>
                </td>
              </tr>
            );
          })}
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

export default userRegister;
