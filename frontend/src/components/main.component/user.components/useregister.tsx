import { baseUrl, initialState, State, User } from "./user.d";
import { useState, useEffect } from "react";
import Main from "../main";

async function fetchUsers(): Promise<User[]> {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
}

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir.",
};

function UserRegister() {
  const [users, setUsers] = useState<State>(initialState);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers((prevState) => ({ ...prevState, list: data }));
    });
  }, []);

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsers({
      ...users,
      user: {
        ...users.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  const clear = () => {
    setUsers((state) => {
      return {
        ...state,
        user: initialState.user,
      };
    });
  };

  const saveUser = () => {
    if ("id" in users.user) {
      setUsers((state) => {
        return {
          ...state,
          list: state.list.map((u: User) =>
            u.id === users.user.id ? users.user : u
          ),
        };
      });

      fetch(`${baseUrl}/${users.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users.user),
      }).then((response) => response.json());
    } else {
      users.user.id = users.list.length + 1;

      setUsers((state) => {
        return {
          ...state,
          list: [...state.list, users.user],
        };
      });

      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users.user),
      }).then((response) => response.json());
    }
    clear();
    setUsers((state: State) => {
      return {
        ...state,
        user: initialState.user,
      };
    });
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
                value={users.user.name}
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
                value={users.user.email}
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

  const deleteUser = (userID: number) => {
    fetch(`${baseUrl}/${userID}`, { method: "DELETE" })
      .then(() => {
        const updatedList = users.list.filter(
          (user: User) => user.id !== userID
        );

        setUsers({
          ...users,
          list: updatedList,
        });
      })
      .catch((err) => console.log("Erro ao excluir o usuário", err));
  };

  const editUser = (userID: number) => {
    const userSelected = users.list.filter(
      (user: User) => user.id === userID
    )[0];

    setUsers({
      ...users,
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
          {users.list.map((user: User) => {
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
                    onClick={() => user.id && deleteUser(user.id)}
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

export default UserRegister;
