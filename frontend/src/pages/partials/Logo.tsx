import LogoImg from "../../assets/images/logo.png";
function Logo() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <img src={LogoImg} className="rounded mx-auto d-block" width={500} alt="Imagem com logo da CNH Na Mão"></img>            
            <p className="text-center"><h1><i>Fazendo match entre alunos e instrutores de todo o Brasil</i></h1></p>
        </div>
    )

}

export default Logo;