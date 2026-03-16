import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import verifiedImg from '../assets/images/verified-account.png';

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
            .catch((error) => console.log(error.message));
    }, []);

    return (
        <div className="container mt-lg-5 mb-lg-5">
            <p className="text-center"><h1>Parabéns!</h1></p>
            <p className="text-center"><h3>Instrutor(a) {modelData.firstname} Cadastrado(a) com Sucesso!</h3></p>
            <hr />
            <div className='row text-center'>
                <div className='col-md-12'>
                    <img src={verifiedImg} className="img-fluid w-50" alt="icone representando sucesso"></img>
                </div>
            </div>
        </div>
    )

}

export default RegisterResult;