import Check from "../../assets/images/check.svg";
import Chat from "../../assets/images/chat.svg";
import Car from "../../assets/images/car.svg";

function Jumbotron() {
    return (
        <div className="container mt-lg-2 mb-lg-2 py-4">
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <div className="row">
                        <p className="col-md-3 fs-2">
                            <img src={Check} alt="" className="mx-auto d-block rounded-circle shadow-lg" role="img" width={140} height={140} />
                        </p>
                        <p className="col-md-9 fs-4">
                            <h1 className="display-5 fw-bold">Cadastre-se como instrutor</h1>
                            Você instrutor se cadastra inserindo nome, e-mail, contato whatsapp,
                            Estado e Cidade que deseja ministrar suas aulas,
                            categorias que ensina e se usa carro próprio ou carro do aluno.
                        </p>
                        <button className="btn btn-lg btn-secondary shadow-lg" type="button">
                            Saiba mais
                        </button>
                    </div>

                </div>
            </div>
            <div className="row align-items-md-stretch">
                <div className="row">
                    <div className="col-md-6">
                        <div className="h-100 p-5 text-bg-dark rounded-3">
                            <h2>Receba solicitações de alunos</h2>
                            <p>
                                Com base nessas informações, o aluno filtra o profissional de acordo com a necessidade
                                e realiza contato com aquele que escolher.
                                A partir de então, a negociação quanto a valores e execução das aulas é com você,
                                sem qualquer interferência da plataforma.
                            </p>
                            <img src={Chat} alt="" className="mx-auto d-block rounded-circle shadow-lg" role="img" width={140} height={140} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                            <h2>Marque e inicie as aulas</h2>
                            <p>
                                Isso traz liberdade para o profissional, que não ficará engessado em agendas pré-definidas,
                                além de permitir negociação dos valores e até criação de pacotes com mais aulas.
                            </p>
                            <img src={Car} alt="" className="mx-auto d-block rounded-circle shadow-lg" role="img" width={160} height={160} />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Jumbotron