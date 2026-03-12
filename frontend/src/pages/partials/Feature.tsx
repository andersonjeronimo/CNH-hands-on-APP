import Check from "../../assets/images/check.svg";
import Chat from "../../assets/images/chat.svg";
import Car from "../../assets/images/car.svg";
import Logo from "../../assets/images/logo.png";
import Instrutores from "../../assets/images/instrutores.png";


function Feature() {

    return (
        <>
            <div className="container mt-lg-5 mb-lg-5">

                <div className="row">
                    <div className="col-lg-4">
                        <img src={Check} alt="" className="mx-auto d-block rounded-circle" role="img" width={140} height={140} />
                        <p className="text-center">
                            <h2 className="fw-normal">Cadastre-se como instrutor</h2>
                        </p>                        
                        <p className="text-center">
                            Você instrutor se cadastra inserindo nome, e-mail, contato whatsapp, Estado e Cidade que deseja ministrar suas aulas, categorias que ensina e se usa carro próprio ou carro do aluno.
                        </p>
                        <p className="text-center">
                            <a className="btn btn-success shadow" href="/details">Mais detalhes &raquo;</a>
                        </p>
                        <hr />
                    </div>

                    <div className="col-lg-4">
                        <img src={Chat} alt="" className="mx-auto d-block rounded-circle" role="img" width={140} height={140} />
                        <p className="text-center">
                            <h2 className="fw-normal">Receba solicitações</h2>
                        </p>                        
                        <p className="text-center">
                            Com base nessas informações, o aluno filtra o profissional de acordo com a necessidade e realiza contato com aquele que escolher. A partir de então, a negociação quanto a valores e execução das aulas é com você, sem qualquer interferência da plataforma.
                        </p>
                        <p className="text-center">
                            <a className="btn btn-info shadow" href="/details">Mais detalhes &raquo;</a>
                        </p>
                        <hr />
                    </div>

                    <div className="col-lg-4">
                        <img src={Car} alt="" className="mx-auto d-block rounded-circle" role="img" width={140} height={140} />
                        <p className="text-center">
                            <h2 className="fw-normal">Marque e inicie as aulas</h2>
                        </p>                        
                        <p className="text-center">
                            Isso traz liberdade para o profissional, que não ficará engessado em agendas pré-definidas, além de permitir negociação dos valores e até criação de pacotes com mais aulas.
                        </p>
                        <p className="text-center">
                            <a className="btn btn-danger shadow" href="/details">Mais detalhes &raquo;</a>
                        </p>
                        <hr />
                    </div>

                </div>

                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">
                            Cadastre-se como instrutor.
                            <span className="text-body-secondary"> Ganhe visibilidade:</span>
                        </h2>
                        <p className="lead">
                            Você instrutor se cadastra inserindo nome, e-mail, contato whatsapp, Estado e Cidade que deseja ministrar suas aulas,
                            categorias que ensina e se usa carro próprio ou carro do aluno.
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img src={Instrutores} alt="" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto shadow rounded" height="500"
                            role="img" width="550" />
                    </div>
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">
                            Receba solicitações de alunos:
                            {/* <span className="text-body-secondary"> Direto pelo Whatsapp.</span> */}
                        </h2>
                        <p className="lead">
                            Com base nessas informações, o aluno filtra o profissional de acordo com a necessidade e realiza contato com aquele que escolher.
                            A partir de então, a negociação quanto a valores e execução das aulas é com você, sem qualquer interferência da plataforma.
                        </p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img src={Logo} alt="" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" height="500"
                            role="img" width="500" />
                    </div>
                </div>
                <hr className="featurette-divider" />
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">
                            Marque e inicie as aulas:
                        </h2>
                        <p className="lead">
                            Isso traz liberdade para o profissional, que não ficará engessado em agendas pré-definidas,
                            além de permitir negociação dos valores e até criação de pacotes com mais aulas.
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img src={Logo} alt="" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" height="500"
                            role="img" width="500" />
                    </div>
                </div>
            </div>
        </>
    )

}
export default Feature