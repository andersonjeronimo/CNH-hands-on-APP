import Construcao from "../../assets/images/construction-worker.svg";

function Construction() {
    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <p className="text-center"><h1>Page Under Construction</h1></p>
            <p className="text-center"><h3>Men at work...</h3></p>

            <div className='text-center'>

                <img src={Construcao} className='rounded' width={300}
                    alt='Homem com capacete de proteção' />

            </div>
        </div>
    )

}

export default Construction;