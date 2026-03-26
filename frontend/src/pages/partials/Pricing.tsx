function Pricing() {
    return (

        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card">
                        <div className="card-header py-3">
                            <h2 className="my-0 fw-normal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg> Aluno
                                {/* <img src={User} width={64} height={64} className="d-inline-block align-top" alt="User"/> Aluno */}
                            </h2>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title">
                                R$ 0,00<small className="text-body-secondary fw-light">/mês</small>
                            </h1>
                            <ul className="list-unstyled mt-3 mb-4">                                
                            </ul>
                            <a href="/search" type="button" className="w-100 btn btn-lg btn-success">
                                Buscar Instrutor
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-header py-3">
                            <h2 className="my-0 fw-normal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg> Instrutor                                
                            </h2>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title">
                                R$ 19,90<small className="text-body-secondary fw-light">/mês</small>
                            </h1>
                            <ul className="list-unstyled mt-3 mb-4">                                
                            </ul>
                            <a href="/register" type="button" className="w-100 btn btn-lg btn-primary">
                                Cadastrar Instrutor
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Pricing;