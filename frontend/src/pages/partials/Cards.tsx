import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import driver from '../../assets/images/instrutor_auto_escola.png';
import student from '../../assets/images/aluno_auto_escola.png';
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
            <div className='row justify-content-center'>
                <div className='col-md-5'>
                    <div className="card mt-lg-3">
                        <div className="card-body">
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
                            <div className="d-grid gap-2">
                                {
                                    !role ?
                                        <button className="btn btn-primary btn-lg shadow" onClick={handleInstructorBtnClick}>
                                            Sou Instrutor <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                            </svg>
                                        </button>
                                        :
                                        <>
                                            {
                                                role === utils.role.instrutor ?
                                                    <a href='/details' className="btn btn-primary btn-lg shadow">
                                                        Minha conta <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                                                        </svg>
                                                    </a>
                                                    :
                                                    <button disabled className="btn btn-secondary btn-lg shadow">
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


                <div className='col-md-5'>
                    <div className="card mt-lg-3">  
                        <div className="card-body">
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
                            <div className="d-grid gap-2">


                                {
                                    !role ?
                                        <button className="btn btn-success btn-lg shadow" onClick={handleStudenBtnClick}>
                                            Sou Aluno <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
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
                                                    <button disabled className="btn btn-secondary btn-lg shadow">
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