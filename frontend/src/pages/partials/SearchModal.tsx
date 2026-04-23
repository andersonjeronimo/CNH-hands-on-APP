import cnhImg from '../../assets/images/CNHdoBrasil.png';
import govImg from '../../assets/images/GOVBR.png';

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
                        <p>
                            <strong>
                                Nossa plataforma exibe instrutores autônomos para você finalizar seu processo de habilitação fazendo as aulas práticas.
                            </strong>
                        </p>

                        <div className="alert alert-success" role="alert">
                            <p className="alert-heading text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                </svg>
                            </p>

                            <p>
                                Se você chegou até aqui, você já completou toda a parte teórica (exames, curso e prova) e já está com a LADV disponível.
                            </p>

                        </div>

                        <div className="alert alert-warning" role="alert">
                            <p className="alert-heading text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                </svg>
                            </p>
                            <p>
                                <strong> Mas se ainda não cumpriu esses pré-requisitos, você pode tirar suas dúvidas com o instrutor prático e já pode adiantar o procedimento acessando:</strong>
                            </p>
                            <div className='row g-3'>
                                <div className='d-grid gap-2 col-12 mx-auto'>
                                    <a className='btn btn-light shadow' href="https://www.gov.br/transportes/pt-br/cnh-do-brasil" target='_blank'>
                                        <img className='rounded-pill' src={cnhImg} width={64} alt="..." /> CNH do Brasil
                                    </a>
                                </div>
                                <br />
                                <div className='d-grid gap-2 col-12 mx-auto'>
                                    <a className='btn btn-light shadow' href="https://www.gov.br/pt-br" target='_blank'>
                                        <img className='rounded-pill' src={govImg} width={64} alt="..." /> Site Gov.br
                                    </a>
                                </div>
                                <br />
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <div className='d-grid gap-2 col-8 mx-auto'>
                            <button type="button" className="btn btn-lg btn-success shadow" data-bs-dismiss="modal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg> Prosseguir para busca
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SearchModal;