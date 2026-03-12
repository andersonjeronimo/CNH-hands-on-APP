import RegisterImg from '../../assets/images/cadastro_instrutor.png';
function Cards() {
    return (

        <div className="container mt-lg-5 mb-lg-5">
            <div className='row text-center'>
                <div className='col-md-6'>
                    <a href='/register' className='btn btn-primary shadow-lg'>
                        <img src={RegisterImg} alt="Imagem ilustrando cadastro de um instrutor" className="img-fluid" />
                    </a>
                </div>
                <div className='col-md-6'>
                    <a href='/search' className='btn btn-success shadow-lg'>
                        <img src={RegisterImg} alt="Imagem ilustrando cadastro de um instrutor" className="img-fluid" />
                    </a>
                </div>
            </div>
        </div>
    )

}

export default Cards;