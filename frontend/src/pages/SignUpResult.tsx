import successImg from '../assets/images/success.svg';

function SignUpResult() {

    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            {/* <p className="text-center"><h1>{modelData.email}</h1></p> */}
            <p className="text-center"><h1>Credenciais de usuário validadas.</h1></p>
            <p className="text-center"><h3>Faça o login e:</h3></p>
            <p className='text-center fs-4'>
                <p>
                    <strong>Instrutor:</strong> Informe, após o login, as informações necessárias (Estado, Cidade, Categoria, Telefone e Veículo.).
                </p>
                <p>
                    <strong>Aluno:</strong> Após login, você já poderá buscar os instrutores conforme os critérios que informar.
                </p>
            </p>
            <hr />
            <div className='row justify-content-md-center'>
                <div className='col-md-6 text-center'>
                    <br />
                    <div className='form-data'>
                        <img src={successImg} className="img-fluid w-50" alt="icone representando sucesso"></img>
                    </div>
                    <br />
                    <div className='form-data'>
                        <a href='/signin' className="btn btn-primary w-100 py-2 shadow">
                            Efetuar Login <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUpResult;