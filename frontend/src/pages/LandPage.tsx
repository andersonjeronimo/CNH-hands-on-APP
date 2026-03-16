import Cards from "./partials/Cards";
import PinImg from '../assets/images/cnh-pin.svg';

function LandPage() {
    return (
        <div className="container mt-lg-5 mb-lg-5">

            <div className='mx-auto d-block text-center'>
                <img
                    className="mb-4"
                    src={PinImg}
                    alt=""
                    width="72"
                    height="57"
                />
            </div>
            <p className="text-center"><h1>CNH Na Mão</h1></p>
            <p className="text-center"><h3>Selecione o perfil</h3></p>
            <hr />
            <Cards></Cards>            
        </div>

    )
}

export default LandPage;