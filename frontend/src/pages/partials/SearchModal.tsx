function SearchModal() {

    return (
        <div className="modal fade" id="introStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="introStaticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="introStaticBackdropLabel">Buscar Instrutores</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="alert alert-success" role="alert">
                            <p className="alert-heading">
                                <strong>
                                    Nossa plataforma exibe instrutores autônomos para você finalizar seu processo de habilitação fazendo as aulas práticas.
                                </strong>
                            </p>

                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                </svg> Se você chegou até aqui, você já completou toda a parte teórica (exames, curso e prova) e já está com a LADV disponível.
                            </p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                </svg> <strong>Se você ainda não fez esses procedimentos você pode tirar suas dúvidas com o instrutor prático, mas já pode adiantar o procedimento acessando:</strong>
                            </p>
                            <p>
                                <ol>
                                    <li>
                                        <a href="https://www.gov.br/transportes/pt-br/cnh-do-brasil" target='_blank'>CNH do BRASIL <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.gov.br/pt-br" target='_blank'>GOV.BR <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                        </a>
                                    </li>
                                </ol>
                            </p>
                        </div>

                        <div className="alert alert-primary col-md-12" role="alert">
                            <p className="alert-heading">
                                <strong>
                                    Encontre seu instrutor de direção em poucos cliques!
                                </strong>
                            </p>
                            <p className='fs-6'>
                                Busque por Estado, cidade, categoria e tipo de veículo e escolha o instrutor ideal para você.
                            </p>
                            <p className='fs-6'>
                                Entre em contato diretamente com o profissional, negocie horários, locais e tire todas as suas dúvidas com liberdade e praticidade.
                            </p>
                            <p className='fs-6'>
                                <strong><i>Simples, rápido e sem burocracia.</i></strong>
                            </p>
                            <p className='fs-6'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                </svg> <strong>Importante:</strong> para iniciar as aulas práticas, é necessário já ter concluído os exames e a parte teórica, além de portar sua LADV (Licença de Aprendizagem de Direção Veicular).
                            </p>
                            <p className='fs-6'>
                                <u>Converse com seu instrutor e informe-se!</u>
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Entendi. Prosseguir para busca</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SearchModal;