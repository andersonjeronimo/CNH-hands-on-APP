//import { useEffect } from 'react';
//import { useState } from 'react';
//import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//import axios from 'axios';

import successImg from '../assets/images/support.png';

//import model from '../assets/utils/user-model.json';

function SignUpResult() {

    //const location = useLocation();
    const navigate = useNavigate();
    //const [modelData, setModelData] = useState(model);

    /* useEffect(() => {
        const _id = location.state;
        axios
            .get(`${import.meta.env.VITE_USER_API_URL}/${_id}`)
            .then((response) => {
                if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                    setModelData(response.data);
                }
            })
            .catch((error) => console.log(error.message));
    }, []); */

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //navigate('/signin', { state: modelData });
        navigate('/signin');
    }


    return (
        <div className="container mt-lg-5 mb-lg-5">
            {/* <p className="text-center"><h1>{modelData.email}</h1></p> */}
            <p className="text-center"><h1>Cadastro</h1></p>
            <p className="text-center"><h3>Seu cadastro foi concluído com sucesso.</h3></p>
            <p className='text-center fs-4'>
                <p>
                    A divulgação da plataforma ajuda mais alunos a conhecerem o CNH na Mão.
                </p>
                <p>
                    Quanto mais alunos acessarem a plataforma, maiores serão suas chances de ser encontrado e contratado.
                </p>
            </p>
            <hr />

            <form className="row g-3 needs-validation" onSubmit={handleSubmit} >
                <div className='row justify-content-md-center'>
                    <div className='col-md-6 text-center'>
                        <br />
                        <div className='form-data'>
                            <img src={successImg} className="img-fluid w-50" alt="icone representando sucesso"></img>
                        </div>
                        <br />
                        <div className='form-data'>
                            <button className="btn btn-primary w-100 py-2 shadow" type="submit">
                                Efetuar Login <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                </svg>
                            </button>
                        </div>

                    </div>

                </div>

            </form>
        </div>
    )

}

export default SignUpResult;