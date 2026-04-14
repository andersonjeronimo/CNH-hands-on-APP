import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

declare var $: any;

import driver from '../assets/images/aluno_02.png';
import instructorModel from '../assets/utils/instructor-model.json';
import userModel from '../assets/utils/user-model.json';
import LogoutModal from './partials/LogoutModal';
import cityModel from '../assets/utils/cidade-model.json';

function Profile() {

    const navigate = useNavigate();

    const [instructorData, setInstructorData] = useState(instructorModel);
    const [userData, setUserData] = useState(userModel);
    const [isLoading, setIsLoading] = useState(true);
    const [microregionData, setMicroregionData] = useState([cityModel]);

    const handleAvatarBtnClick = () => {
        alert('Clicou');
    }

    //buscar cidades da microrregião na API do IBGE            
    //`https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/${city?.microrregiao.id}/municipios`
    async function loadCitiesByMicroregionId(microregionId: number) {
        const url_start = import.meta.env.VITE_IBGE_API_MICROREGIONS_START;
        const url_end = import.meta.env.VITE_IBGE_API_MICROREGIONS_END;
        const url_microregions = `${url_start}${microregionId}${url_end}`;
        const response = await fetch(url_microregions, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (!response.ok) {
            //throw new Error(`Response status: ${_response.status}`);
            alert(`${response.status}`);
        }
        const data = await response.json();
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            setMicroregionData(data);
        } else {
            setMicroregionData([cityModel]);
        }
    }

    useEffect(() => {
        const role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        const email = localStorage.getItem(`${import.meta.env.VITE_EMAIL_VAR}`);

        setUserData(prevState => ({
            ...prevState,
            ['email']: email ?? '',
            ['role']: role ?? ''

        }));

        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        const user_id = localStorage.getItem(`${import.meta.env.VITE_ID_VAR}`);

        const url = `${import.meta.env.VITE_INSTRUCTOR_API_USER_ID_URL}/${user_id}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(async (response) => {
            //if (!response.ok) {
            //    //throw new Error(`Response status: ${_response.status}`);
            //    //alert(`${response.status}`);
            //    $('#logoutModal').modal('show');
            //}

            //if (response.status === 500) {
            //    setIsLoading(false);
            //    //alert(`${response.status} : Erro no servidor. Tente novamente mais tarde.`);
            //    $('#logoutModal').modal('show');
            //}
            const data = await response.json();

            if (data.status === 401) {
                setIsLoading(false);
                $('#logoutModal').modal('show');
            } else if (data.status === 404 || !data.success) {
                setIsLoading(false);
                navigate('/register');
            } else {
                if (typeof data.result === 'object' && Object.keys(data.result).length > 0) {
                    /* verificar se já existe, carregar os dados no formulario */
                    setInstructorData(data.result);

                    //buscar cidades da microrregião na API do IBGE            
                    await loadCitiesByMicroregionId(data.result.microregionId || 0);

                    //setIsLoading(false);
                }
            }

        }).finally(() => {
            setIsLoading(false);
        });

    }, []);

    return isLoading ?
        (
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
        : (
            <div className="container container-fluid mt-lg-5 mb-lg-5">
                <LogoutModal></LogoutModal>
                <p className='text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                </p>
                <p className="text-center"><h1>Meu Perfil</h1></p>
                <hr />
                <div className="row g3">
                    <div className='col-md-12'>

                        <div className="alert alert-info col-md-12" role="alert">
                            <h5 className="alert-heading">Prezado(a) Instrutor(a) {instructorData.firstname}:</h5>
                            <p>A partir de agora você já poderá ser localizado pelos alunos através de nossa plataforma!</p>
                        </div>

                    </div>
                </div>


                <div className='row g-3'>
                    <div className='col-md-6'>

                        <div className='row g-3 justify-content-center'>

                            <div className='col-md-12 text-center'>
                                <div className='text-center mt-lg-3'>
                                    <img src={driver} className="rounded-circle border w-50" alt="..." />
                                </div>

                                <button className="btn btn-primary" type="button" id="button-avatar" onClick={handleAvatarBtnClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                    </svg> Editar
                                </button>
                                <p className="fs-5">{instructorData.firstname}</p>
                                <p className="fs-5"><strong>{userData.role}</strong></p>
                                <hr />
                            </div>

                            <div className='col-md-12'>
                                <label className='form-label'>Nome</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={instructorData.firstname} disabled />
                                </div>
                            </div>

                            <div className='col-md-12'>
                                <label className='form-label'>Sobrenome</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={instructorData.lastname} disabled />
                                </div>
                            </div>

                            <div className='col-md-12'>
                                <label className='form-label'>Email</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={userData.email} disabled />
                                </div>
                            </div>

                            <div className='col-md-12'>
                                <label className='form-label'>Categoria</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={instructorData.category} disabled />
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='col-md-6'>

                        <div className='col-md-12'>
                            <label className='form-label'>Estado</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={instructorData.state} disabled />
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>Cidade</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={instructorData.city} disabled />
                            </div>
                        </div>


                        {
                            instructorData.callByMicroregion ? (
                                <div className='col-md-12'>
                                    <label className='form-label'>Cidades atendidas - microrregião</label>
                                    <div className="alert alert-warning">
                                        <ul>
                                            {
                                                microregionData.map(city => (
                                                    <li>{city.nome}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>

                            ) : (
                                <></>
                            )
                        }

                        <div className='col-md-12'>
                            <label className='form-label'>CPF</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={instructorData.cpf} disabled />
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>CNPJ</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={instructorData.cnpj} disabled />
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>DDD</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={instructorData.ddd} disabled />
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>Telefone | Whatsapp</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={instructorData.phone} disabled />
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>Veículo utilizado durante as aulas</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={instructorData.vehicle} disabled />
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>Descrição</label>
                            <div className="input-group mb-3">
                                <textarea className='form-control' name='description' id='description'
                                    value={instructorData.description} rows={3} disabled
                                    placeholder='Ajude o aluno a te escolher, fale um pouco sobre você, seu perfil profissional, veiculo que utiliza, tempo na carreira, etc...'>
                                </textarea>
                            </div>
                        </div>

                    </div>


                    <div className='d-grid gap-2 col-12 mx-auto'>
                        <a className='btn btn-primary btn-lg shadow' href='/edit-profile'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                            </svg> Editar Perfil
                        </a>
                    </div>

                </div>

            </div>
        )
}

export default Profile;