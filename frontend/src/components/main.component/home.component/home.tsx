import Main from "../main";

function Home() {
  return (
    <Main icon="home" title="Início" subtitle="Cadastro de usuário">
      <div className="display-4">Bem Vindo!</div>
      <hr />
      <p className="mb-0">
        Sistema para exemplificar um cadastro de usuários desenvolvido em React
      </p>
    </Main>
  );
}

export default Home;
