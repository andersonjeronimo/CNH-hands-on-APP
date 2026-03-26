import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import successImg from '../assets/images/success.svg';

import model from '../assets/utils/instructor-model.json';

function RegisterResult() {

    const location = useLocation();

    const [modelData, setModelData] = useState(model);

    useEffect(() => {
        const _id = location.state;
        if (_id) {
            axios
                .get(`${import.meta.env.VITE_INSTRUCTOR_API_URL}/${_id}`)
                .then((response) => {
                    if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                        setModelData(response.data);
                    }
                })
                .catch((error) => console.log(error.message));
        }
    }, []);

    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <p className="text-center"><h1>Cadastro concluído.</h1></p>
            <p className="text-center"><h3>Instrutor {modelData.firstname}, os alunos já podem te encontrar!</h3></p>
            <p className='text-center fs-4'>
                <p>
                    A divulgação da plataforma ajuda mais alunos a conhecerem o CNH na Mão.
                </p>
                <p>
                    Quanto mais alunos acessarem a plataforma, maiores serão suas chances de ser encontrado e contratado.
                </p>
            </p>
            <hr />

            <div className='row justify-content-md-center'>
                <div className='col-md-6 text-center'>
                    <br />
                    <div className='form-data'>
                        <img src={successImg} className="img-fluid w-50" alt="icone representando sucesso"></img>
                    </div>
                    <br />
                    <div className='form-data'>
                        <a href='/details' className="btn btn-primary w-100 py-2 shadow">
                            Acessar Perfil <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                            </svg>
                        </a>
                    </div>

                </div>

            </div>


        </div>
    )

}

export default RegisterResult;