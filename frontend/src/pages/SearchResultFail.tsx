import noResults from '../assets/images/no-results.png'

function SerchResultFail() {

    return (

        <div className="container mt-lg-5 mb-lg-5">
            <p className="text-center"><h1>Erro:</h1></p>
            <p className="text-center"><h3>Não foram localizados instrutores com os critérios informados.</h3></p>
            <hr />
            <div className='row text-center'>
                <div className='col-md-12'>
                    <img src={noResults} className="img-fluid w-50" alt="icone representando erro"></img>
                </div>
            </div>
        </div>
    )
}

export default SerchResultFail;