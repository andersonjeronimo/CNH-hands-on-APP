import Logo from "../../assets/images/logo.png";

function Carousel() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <div id="carouselExampleIndicators" className="carousel slide mt-lg-5 mb-lg-5">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Logo} className="w-50 " alt="Logotipo do CNH Na Mão" />
                        <div className="container">
                            <div className="carousel-caption text-start">                                
                                <div className="col-md-12">                                    
                                    <a className="btn btn-primary form-control btn-lg shadow-lg" href="/register" role="button">                                        
                                        Cadastre-se como instrutor!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={Logo} className="w-50" alt="Logotipo do CNH Na Mão" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <div className="col-md-12">                                    
                                    <a className="btn btn-primary form-control btn-lg shadow-lg" href="/register" role="button">                                        
                                        Cadastre-se como instrutor!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={Logo} className="w-50" alt="Logotipo do CNH Na Mão" />
                        <div className="container">
                            <div className="carousel-caption text-start">                                
                                <div className="col-md-12">                                    
                                    <a className="btn btn-primary form-control btn-lg shadow-lg" href="/register" role="button">                                        
                                        Cadastre-se como instrutor!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>             
        </div>
    )
}

export default Carousel