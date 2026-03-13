import LogoImg from "../../assets/images/logo.png";
function Logo() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <div className='row'>
                <div className='col-md-12'>
                    <div className="text-center">
                        <img src={LogoImg} className="img-fluid w-50" alt="..." />                        
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="text-center">                        
                        <p>
                            <h1><i>Fazendo match entre alunos e instrutores de todo o Brasil</i></h1>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Logo;