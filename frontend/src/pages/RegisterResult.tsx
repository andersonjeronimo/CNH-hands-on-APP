import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import model from '../assets/utils/instructor-model.json';

function RegisterResult() {

    const location = useLocation();
    const [modelData, setModelData] = useState(model);

    useEffect(() => {
        const _id = location.state;
        if (_id) {
            const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
            const url = `${import.meta.env.VITE_INSTRUCTOR_API_URL}/${_id}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }).then(async (response) => {
                if (!response.ok) {
                    //throw new Error(`Response status: ${_response.status}`);
                    alert(`${response.status}`);
                }
                const data = await response.json();
                if (typeof data.result === 'object' && Object.keys(data.result).length > 0) {
                    /* verificar se já existe, carregar os dados no formulario */
                    setModelData(data.result);
                }                
            });


        }
    }, []);

    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <div className='text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                </svg>
            </div>
            <p className="text-center"><h1>Cadastro concluído.</h1></p>

            <div className="alert alert-primary" role="alert">
                <h4 className="alert-heading">Instrutor {modelData.firstname}, os alunos já podem te encontrar!</h4>
                <hr />
                <p className='fs-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                    </svg> A divulgação da plataforma ajuda mais alunos a conhecerem o CNH na Mão.
                </p>
                <p className='fs-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
                        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z" />
                    </svg> Quanto mais alunos acessarem a plataforma, maiores serão suas chances de ser encontrado e contratado.
                </p>
            </div>

            <div className='row justify-content-md-center'>
                <div className='col-md-6 text-center'>
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