import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Instrutores from '../assets/images/instrutores.png';

import model from '../assets/utils/instructor-model.json';

function RegisterResult() {

    const location = useLocation();
    const [modelData, setModelData] = useState(model);

    useEffect(() => {
        const _id = location.state;
        axios
            .get(`${import.meta.env.VITE_INSTRUCTOR_API_URL}/${_id}`)
            .then((response) => {
                if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                    setModelData(response.data);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="container mt-lg-5 mb-lg-5">
            <p className="text-center"><h1>Cadastrado de Instrutores</h1></p>
            <p className="text-center"><h3>Instrutor(a) {modelData.firstname} Cadastrado(a) com Sucesso!</h3></p>
            <hr />
            <div className='row text-center'>
                <div className='col-md-12'>
                    <img src={Instrutores} className="img-fluid" alt="imagem de vários instrutores"></img>
                </div>
            </div>
        </div>
    )

}

export default RegisterResult;