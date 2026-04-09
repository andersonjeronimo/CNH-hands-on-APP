import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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


    const handleInstructorBtnClick = async () => {
        const _role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (!_role) {
            localStorage.setItem(`${import.meta.env.VITE_PROFILE_VAR}`, utils.role.instrutor);
            navigate('/signin');
        } else {
            if (_role === utils.role.instrutor) {
                navigate('/profile');
            }
        }
    };

    return (

        <div className='container container-fluid mb-lg-5'>
            <div className='row justify-content-center'>
                <div className='col-lg-6'>
                    <br />
                    <div className="d-grid gap-2">
                        {
                            !role ?
                                <button className="btn btn-primary btn-lg shadow" onClick={handleInstructorBtnClick}>
                                    Sou Instrutor <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                    </svg>
                                </button>
                                :
                                <>
                                    {
                                        role === utils.role.instrutor ?
                                            <a href='/profile' className="btn btn-primary btn-lg shadow">
                                                Meu Perfil <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                                </svg>
                                            </a>
                                            :
                                            <button disabled className="btn btn-secondary btn-lg shadow">
                                                Sou Instrutor <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                                </svg>
                                            </button>
                                    }
                                </>
                        }
                    </div>
                </div>

                <div className='col-lg-6'>
                    <br />
                    <div className="d-grid gap-2">
                        <a href='/search' className="btn btn-success btn-lg shadow">
                            Buscar Instrutores <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Cards;