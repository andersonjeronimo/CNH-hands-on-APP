function Explanation() {
    return (

        <div className="container mt-lg-5 mb-lg-5">
            <div className="accordion" id="accordionPanelsStayOpen">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse1" aria-expanded="true" aria-controls="panelsStayOpen-collapse1">
                            <strong>O que é a plataforma CNH NA MÃO?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse1" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <p className="fw-normal text-start">
                                <p>
                                    Mudanças recentes nas regras para obtenção da primeira habilitação passaram a permitir que instrutores atuem de forma autônoma,
                                    sem depender exclusivamente das autoescolas.
                                </p>
                                <p>
                                    Foi a partir dessa nova realidade que nasceu o <strong>CNH na Mão</strong>: uma plataforma que conecta alunos e instrutores de forma simples,
                                    rápida e segura, facilitando o acesso às aulas práticas em todo o Brasil.
                                </p>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse2"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapse2">
                            <strong>Como nós ajudamos os INSTRUTORES?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse2" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <p className="fw-normal text-start">
                                <p>
                                    Nosso objetivo é simples: dar visibilidade ao seu trabalho e facilitar que novos alunos encontrem você.
                                    Ao se cadastrar, seu perfil passa a aparecer para alunos da sua região, permitindo contato direto, rápido e sem intermediários.
                                    Você mantém total autonomia sobre:
                                </p>
                                <ul>
                                    <li>
                                        valores das aulas
                                    </li>
                                    <li>
                                        horários disponíveis
                                    </li>
                                    <li>
                                        forma de pagamento
                                    </li>
                                    <li>
                                        negociação com o aluno
                                    </li>
                                </ul>
                                <p>
                                    A plataforma não interfere na sua rotina, apenas aproxima você de quem precisa das suas aulas.
                                </p>
                                <p className="text-center">
                                    <a className="btn btn-primary shadow" href="/#">Quero me cadastrar</a>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse3"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapse3">
                            <strong>Como nós ajudamos os ALUNOS?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse3" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <p className="fw-normal text-start">
                                <p>
                                    Com o CNH na Mão, você aluno encontra instrutores credenciados perto de você,
                                    agenda aulas práticas com total flexibilidade e inicia sua jornada de habilitação com mais autonomia de forma simples
                                    — tudo para economizar tempo e ter liberdade para escolher como, quando e com quem aprender.
                                </p>
                                <p className="text-center">
                                    <a className="btn btn-success shadow" href="/#">Buscar um instrutor</a>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Explanation;