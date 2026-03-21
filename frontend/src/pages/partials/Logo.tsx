import LogoImg from "../../assets/images/logo.png";
function Logo() {
    return (
        <div className="container mt-lg-5">
            <div className='row'>
                <div className='col-md-12'>
                    <div className="text-center">
                        <img src={LogoImg} width={300} className="img-fluid" alt="..." />                        
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className="text-center">                        
                        <p>
                            <h2><i>Fazendo match entre alunos e instrutores de todo o Brasil</i></h2>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Logo;