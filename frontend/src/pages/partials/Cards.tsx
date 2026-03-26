import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import driver from '../../assets/images/instrutor_auto_escola.jpeg';
import student from '../../assets/images/aluno_auto_escola.jpeg';
import utils from '../../assets/utils/utils.json';

function Cards() {

    const navigate = useNavigate();
    const [role, setRole] = useState("");

    useEffect(() => {
        localStorage.removeItem(`${import.meta.env.VITE_PROFILE_VAR}`);
        const _role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (_role) {
            setRole(_role);
        } else {
            setRole("");
        }

    }, []);


    const handleStudenBtnClick = async () => {
        const _role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (!_role) {
            localStorage.setItem(`${import.meta.env.VITE_PROFILE_VAR}`, utils.role.aluno);
            navigate('/signin');
        } else {
            if (_role === utils.role.aluno) {
                navigate('/search');
            }
        }

    };

    const handleInstructorBtnClick = async () => {
        const _role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (!_role) {
            localStorage.setItem(`${import.meta.env.VITE_PROFILE_VAR}`, utils.role.instrutor);
            navigate('/signin');
        } else {
            if (_role === utils.role.instrutor) {
                navigate('/details');
            }
        }
    };

    return (

        <div className='container container-fluid mt-lg-5 mb-lg-5'>
            <div className='row'>

                <div className='col-md-6'>
                    <div className="card" >
                        <div className="card-body text-center">
                            <div className="overflow-hidden rounded shadow-lg">
                                <img src={driver} className={
                                    (role && role === utils.role.aluno) ?
                                        "img-fluid grayscale"
                                        :
                                        "img-fluid transition-zoom"
                                }
                                    alt="..." onClick={handleInstructorBtnClick} />
                            </div>
                            <hr />
                            <h1 className="card-title">Instrutor</h1>
                            <div className="d-grid gap-2">
                                {
                                    !role ?
                                        <button className="btn btn-primary btn-lg shadow" onClick={handleInstructorBtnClick}>
                                            Entrar <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                            </svg>
                                        </button>
                                        :
                                        <>
                                            {
                                                role === utils.role.instrutor ?
                                                    <a href='/details' className="btn btn-primary btn-lg shadow">
                                                        Acessar Perfil <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                                        </svg>
                                                    </a>
                                                    :
                                                    <button disabled className="btn btn-primary btn-lg shadow">
                                                        Entrar <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                                        </svg>
                                                    </button>
                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="overflow-hidden rounded shadow-lg">
                                <img src={student} className={
                                    (role && role === utils.role.instrutor) ?
                                        "img-fluid grayscale"
                                        :
                                        "img-fluid transition-zoom"
                                }
                                    alt="..." onClick={handleStudenBtnClick} />
                            </div>
                            <hr />
                            <h1 className="card-title">Aluno</h1>
                            <div className="d-grid gap-2">


                                {
                                    !role ?
                                        <button className="btn btn-success btn-lg shadow" onClick={handleStudenBtnClick}>
                                            Entrar <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                            </svg>
                                        </button>
                                        :
                                        <>
                                            {
                                                role === utils.role.aluno ?
                                                    <a href='/search' className="btn btn-success btn-lg shadow">
                                                        Encontre instrutores de trânsito <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                                        </svg>
                                                    </a>
                                                    :
                                                    <button disabled className="btn btn-success btn-lg shadow">
                                                        Entrar <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                                        </svg>
                                                    </button>
                                            }
                                        </>
                                }


                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Cards;