import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cpf, cnpj } from 'cpf-cnpj-validator';

declare var $: any;

import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
import instructorModel from '../assets/utils/instructor-model.json';
import LogoutModal from './partials/LogoutModal';
import utils from '../assets/utils/utils.json';

function EditProfileForm() {

    const navigate = useNavigate();

    const messageClass = {
        primary: 'alert alert-primary',
        success: 'alert alert-success',
        danger: 'alert alert-danger',
        warning: 'alert alert-warning',
        info: 'alert alert-info'
    }

    const inputFocusClass = {
        default: 'form-control',
        danger: 'form-control focus-ring focus-ring-danger py-1 px-2 text-decoration-none border rounded-2'
    }

    const [message, setMessage] = useState('Edite seu perfil. Altere os campos e clique em salvar para atualizar suas informações de cadastro.');
    const [alertClass, setAlertClass] = useState(messageClass.primary);
    const [inputClass, setInputClass] = useState(inputFocusClass.default);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [selectedProvince, setSelectedProvince] = useState(provinceModel);
    const [citiesData, setCitiesData] = useState([cityModel]);//cidades por UF
    const [microregionData, setMicroregionData] = useState([cityModel]);
    const [formData, setFormData] = useState(instructorModel);
    const [isCpf, setIsCpf] = useState(true);
    const [isCnpj, setIsCnpj] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [isDropdown, setIsDropdown] = useState(true);
    const [isInputText, setIsInputText] = useState(false);

    const [editStateField, setEditStateField] = useState(false);
    const handleStateBtnClick = () => {
        setEditStateField(editStateField => !editStateField);
    };

    const [editCityField, setEditCityField] = useState(false);
    const handleCityBtnClick = () => {
        setEditCityField(editCityField => !editCityField);
    };

    const [editFirstNameField, setEditFirstNameField] = useState(false);
    const handleFirstNameBtnClick = () => {
        setEditFirstNameField(editFirstNameField => !editFirstNameField);
    };

    const [editLastNameField, setEditLastNameField] = useState(false);
    const handleLastNameBtnClick = () => {
        setEditLastNameField(editLastNameField => !editLastNameField);
    };

    const [editCpfField, setEditCpfField] = useState(false);
    const handleCpfBtnClick = () => {
        setEditCpfField(editCpfField => !editCpfField);
    };

    const [editCnpjField, setEditCnpjField] = useState(false);
    const handleCnpjBtnClick = () => {
        setEditCnpjField(editCnpjField => !editCnpjField);
    };

    const [editPhonePrefixField, setEditPhonePrefixField] = useState(false);
    const handlePhonePrefixBtnClick = () => {
        setEditPhonePrefixField(editPhonePrefixField => !editPhonePrefixField);
    };

    const [editPhonePrefixField2, setEditPhonePrefixField2] = useState(false);
    const handlePhonePrefix2BtnClick = () => {
        setEditPhonePrefixField2(editPhonePrefixField2 => !editPhonePrefixField2);
    };

    const [editPhoneField, setEditPhoneField] = useState(false);
    const handlePhoneBtnClick = () => {
        setEditPhoneField(editPhoneField => !editPhoneField);
    };

    //load cities by province id
    //buscar cidades na API do IBGE
    async function loadCitiesByProvinceId(provinceId: number) {
        const url_start = import.meta.env.VITE_IBGE_API_CITIES_START;
        const url_end = import.meta.env.VITE_IBGE_API_CITIES_END;
        const url_cities = `${url_start}${provinceId}${url_end}`;
        const response = await fetch(url_cities, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (!response.ok) {
            //throw new Error(`Response status: ${_response.status}`);
            setMessage(`${response.status}`);
        }
        const data = await response.json();
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            setCitiesData(data)
        } else {
            setCitiesData([cityModel]);
        }
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
            setMessage(`${response.status}`);
        }
        const data = await response.json();
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            setMicroregionData(data);
        } else {
            setMicroregionData([cityModel]);
        }
    }

    async function loadPhonePrefixes(provinceId: number) {
        provinceData.forEach(estado => {
            if (estado.id === provinceId) {
                setSelectedProvince(estado);
                return;
            }
        });
    }

    useEffect(() => {
        setProvinceData(Estados);
        setFormData(instructorModel);

        const user_id = localStorage.getItem(`${import.meta.env.VITE_ID_VAR}`);
        if (user_id) {
            formData.userId = user_id;
            const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
            const url = `${import.meta.env.VITE_INSTRUCTOR_API_USER_ID_URL}/${user_id}`;

            //Carregar o perfil do instrutor para edição
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }).then(async (response) => {
                const data = await response.json();

                if (response.status === 500 || !data.success) {
                    setIsLoading(false);
                    $('#logoutModal').modal('show');
                } else {
                    if (typeof data.result === 'object' && Object.keys(data.result).length > 0) {
                        /* verificar se já existe, carregar os dados no formulario */
                        setFormData(data.result);

                        //carregar cidades da UF selecionada
                        await loadPhonePrefixes(data.result.stateId);
                        await loadCitiesByProvinceId(data.result.stateId);
                        await loadCitiesByMicroregionId(data.result.microregionId);
                    }
                }

            }).finally(() => {
                setIsLoading(false);
            });

        } else {
            setIsLoading(false);
            $('#logoutModal').modal('show');
        }

    }, []);


    const handleCpfCnpjRadioChange = (e: any) => {
        const { name, checked } = e.target;
        if (name === 'cpf-radio') {
            if (checked) {
                setIsCpf(true);
                setIsCnpj(false);
            }
        } else {
            setIsCpf(false);
            setIsCnpj(true);
        }
    }

    const handleDDDRadioChange = (e: any) => {
        const { name, checked } = e.target;
        if (name === 'ddd-dropdown-radio') {
            if (checked) {
                setIsDropdown(true);
                setIsInputText(false);
            }
        } else {
            setIsDropdown(false);
            setIsInputText(true);
        }
    }

    const handleInputChange = async (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        //const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);

        //Estado===============================================
        if (name === 'state') {
            const province = provinceData.find(estado => estado.nome === value);
            setSelectedProvince(province || provinceModel);
            setFormData(prevState => ({
                ...prevState,
                ['stateId']: province?.id || 0,
                ['state']: province?.nome || '',                
                ['cityId']: 0,
                ['city']: '',
                ['microregionId']: 0,
                ['callByMicroregion']: false,
            }));
            //resetar cidades e microrregião para evitar inconsistências
            setMicroregionData([cityModel]);

            //buscar cidades na API do IBGE
            await loadCitiesByProvinceId(province?.id || 0);

            setAlertClass(messageClass.info);
            setMessage(`Selecione o município no campo 2 - cidade - deste formulário`);

        }
        //Cidade===============================================
        else if (name === 'city') {
            const city = citiesData.find(_city => _city.nome === value);
            setFormData(prevState => ({
                ...prevState,
                ['cityId']: city?.id || 0,
                ['city']: city?.nome || '',
                ['microregionId']: city?.microrregiao.id || 0,
                ['callByMicroregion']: false,
            }));

            setAlertClass(messageClass.info);
            setMessage(`Receber solicitações de cidades vizinhas? Selecione no campo 3 - microrregião - deste formulário`);

            //buscar cidades da microrregião na API do IBGE            
            await loadCitiesByMicroregionId(city?.microrregiao.id || 0);

        }
        //Termos e condições===================================
        else if (type === 'checkbox') {
            if (name === 'agree') {
                if (checked) {
                    setAlertClass(messageClass.warning);
                    setMessage(`Li e concordo com os termos e condições`);
                    //setSubmitBtnDisabled(false);
                } else {
                    setAlertClass(messageClass.danger);
                    setMessage(`Para efetuar o cadastro, é necessário concordar com os termos e condições`);
                    //setSubmitBtnDisabled(true);
                }
            }
            if (name === 'callByMicroregion') {
                if (checked) {
                    if (formData.city) {
                        setAlertClass(messageClass.info);
                        setMessage(`Microrregião de ${formData.city} : ${microregionData.map((city) => (` ${city.nome}`))}`);
                    }
                } else {
                    if (formData.city) {
                        setAlertClass(messageClass.info);
                        setMessage(`Não receber solicitações de cidades vizinhas. Somente de ${formData.city}`);
                    }
                }
            }

        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        //Validar CPF | CNPJ
        const _cpf = formData.cpf;
        const _cnpj = formData.cnpj;

        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);

        formData.status = utils.status.ativo;

        if (isCpf && !cpf.isValid(_cpf)) {
            setInputClass(inputFocusClass.danger);
            setAlertClass(messageClass.danger);
            setMessage(`Atenção: O CPF informado, ${formData.cpf}, é inválido`);
            setFormData(prevState => ({
                ...prevState,
                ['cpf']: ''
            }));
        } else if (isCnpj && !cnpj.isValid(_cnpj)) {
            setInputClass(inputFocusClass.danger);
            setAlertClass(messageClass.danger);
            setMessage(`Atenção: O CNPJ informado, ${formData.cnpj}, é inválido`);
            setFormData(prevState => ({
                ...prevState,
                ['cnpj']: ''
            }));


        } else if (!formData.userId) {
            setMessage(`Acesso indevido: sem autenticação. Acessar tela de login`);
        } else {
            //Prosseguir Cadastro de instrutores. Preencha os campos obrigatórios
            setInputClass(inputFocusClass.default);

            //Verificar se já existe o CPF | CNPJ cadastrado
            let api_url = '';

            if (isCpf) {
                api_url = `${import.meta.env.VITE_INSTRUCTOR_API_CPF_URL}/${formData.cpf}`;
            } else if (isCnpj) {
                api_url = `${import.meta.env.VITE_INSTRUCTOR_API_CNPJ_URL}/${formData.cnpj}`;
            }

            const response = await fetch(api_url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 500) {
                setAlertClass(messageClass.danger);
                setMessage(`Erro no servidor. Tente novamente mais tarde.`);
            }

            const data = await response.json();

            if (data.status === 200) {
                //setMessage('Data is a non-empty object.');
                setAlertClass(messageClass.danger);
                setMessage(`Já existe um usuário com o CPF / CNPJ ${formData.cpf ?? formData.cnpj} cadastrado.`);
                alert(`Já existe um usuário com o CPF / CNPJ ${formData.cpf ?? formData.cnpj} cadastrado.`);
                setFormData(prevState => ({
                    ...prevState,
                    ['cpf']: '',
                    ['cnpj']: '',
                }));

            } else {
                const api_url = `${import.meta.env.VITE_INSTRUCTOR_API_URL}`;
                const response = await fetch(api_url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                //o result é o ID do instrutor cadastrado
                navigate('/register-result', { state: data.result });
            }

        }

    };

    return isLoading ?
        (
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
        :
        (
            <div className="container container-fluid mt-lg-5 mb-lg-5">
                <LogoutModal></LogoutModal>
                <p className='text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                    </svg>
                </p>
                <p className="text-center"><h1>Editar Perfil</h1></p>
                <hr />

                <form className="needs-validation" onSubmit={handleSubmit} >

                    <div className='row g-3 align-items-center'>

                        <div className='col-md-12'>
                            <div className={alertClass} role='alert'>
                                <p className="fs-5">
                                    {message}
                                </p>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>1 - Estado</label>
                            <div className="input-group mb-3">
                                {editStateField ? (
                                    <>
                                        <select name='state' id='state' className='form-select' value={formData.state} onChange={handleInputChange} required>
                                            <option selected disabled value={''}>Selecione o Estado</option>
                                            {provinceData.map((option) => (
                                                <option key={option.id} value={option.nome}>
                                                    {option.sigla} - {option.nome}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="btn btn-success" type="button" id="button-addon2" onClick={handleStateBtnClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                            </svg> Salvar
                                        </button>
                                    </>
                                ) : (
                                    <>

                                        <input type="text" disabled className="form-control" value={formData.state} 
                                        placeholder='Selecione o Estado' aria-describedby="button-addon2" />
                                        <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleStateBtnClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg> Editar
                                        </button>

                                    </>
                                )}
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>2 - Cidade</label>
                            <div className="input-group mb-3">
                                {editCityField ? (
                                    <>
                                        <select name='city' id='city' className='form-select' value={formData.city} onChange={handleInputChange} required>
                                            <option selected disabled value={''}>Selecione a cidade</option>
                                            {citiesData.map((option) => (
                                                <option key={option.id} value={option.nome}>
                                                    {option.nome}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="btn btn-success" type="button" id="button-addon2" onClick={handleCityBtnClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                            </svg> Salvar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input type="text" disabled className="form-control" value={formData.city} 
                                        placeholder='Selecione a Cidade'
                                        aria-describedby="button-addon2" />
                                        <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleCityBtnClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg> Editar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className='alert alert-warning' role='alert'>
                                <label className='form-label'>3 - Microrregião</label>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        name="callByMicroregion"
                                        id="callByMicroregion"
                                        checked={formData.callByMicroregion}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label">
                                        Receber solicitações de alunos da microrregião (cidades vizinhas)?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>

                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>4 - Nome</label>
                            <div className="input-group mb-3">
                                {
                                    editFirstNameField ? (
                                        <>
                                            <input type='text' className='form-control' name='firstname' id='firstname'
                                                value={formData.firstname} onChange={handleInputChange} required autoComplete='off' />
                                            <button className="btn btn-success" type="button" id="button-addon2" onClick={handleFirstNameBtnClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                </svg> Salvar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <input type="text" disabled className="form-control" value={formData.firstname} placeholder='Campo obrigatório' aria-describedby="button-addon2" />
                                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleFirstNameBtnClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> Editar
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>


                        <div className='col-md-6'>
                            <label className='form-label'>5 - Sobrenome</label>
                            <div className="input-group mb-3">
                                {
                                    editLastNameField ? (
                                        <>
                                            <input type='text' className='form-control' name='lastname' id='lastname'
                                                value={formData.lastname} onChange={handleInputChange} required autoComplete='off' />
                                            <button className="btn btn-success" type="button" id="button-addon2" onClick={handleLastNameBtnClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                </svg> Salvar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <input type="text" disabled className="form-control" value={formData.lastname} placeholder='Campo obrigatório'
                                             aria-describedby="button-addon2" />
                                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleLastNameBtnClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> Editar
                                            </button>
                                        </>
                                    )
                                }

                            </div>
                        </div>

                        <hr />

                        <div className='col-md-6'>
                            <label className='form-label'>6 - CPF</label>
                            <div className="input-group mb-3">
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="cpf-radio"
                                        id="cpf-radio"
                                        checked={isCpf}
                                        onChange={handleCpfCnpjRadioChange}
                                    />
                                </div>

                                {editCpfField ? (
                                    <>
                                        <input type='text' className={inputClass} name='cpf' id='cpf'
                                            value={formData.cpf} onChange={handleInputChange}
                                            placeholder='Apenas números, sem pontos ou traços.'
                                            required={isCpf} disabled={isCnpj} />
                                        <button className="btn btn-success" type="button" id="button-addon2" onClick={handleCpfBtnClick} disabled={isCnpj}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                            </svg> Salvar
                                        </button>
                                    </>) : (
                                    <>
                                        <input type="text" disabled className="form-control" value={formData.cpf} placeholder='Apenas números, sem pontos ou traços.' aria-describedby="button-addon2" />
                                        <button className="btn btn-primary" type="button" id="button-addon2" disabled={isCnpj} onClick={handleCpfBtnClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg> Editar
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>CNPJ</label>
                            <div className="input-group mb-3">
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="cnpj-radio"
                                        id="cnpj-radio"
                                        checked={isCnpj}
                                        onChange={handleCpfCnpjRadioChange}
                                    />
                                </div>

                                {
                                    editCnpjField ? (
                                        <>
                                            <input type='text' className={inputClass} name='cnpj' id='cnpj'
                                                value={formData.cnpj} onChange={handleInputChange}
                                                placeholder='Apenas números, sem pontos, traços ou barra.'
                                                required={isCnpj} disabled={isCpf} />
                                            <button className="btn btn-success" type="button" id="button-addon2" onClick={handleCnpjBtnClick} disabled={isCpf}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                </svg> Salvar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <input type="text" disabled className="form-control" value={formData.cnpj} placeholder='Apenas números, sem pontos, traços ou barra.' aria-describedby="button-addon2" />
                                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleCnpjBtnClick} disabled={isCpf}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> Editar
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        <hr />

                        <div className='col-md-3'>
                            <label className='form-label'>7 - DDD</label>
                            <div className="input-group mb-3">

                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="ddd-dropdown-radio"
                                        id="ddd-dropdown-radio"
                                        checked={isDropdown}
                                        onChange={handleDDDRadioChange}
                                    />
                                </div>

                                {
                                    editPhonePrefixField ? (
                                        <>
                                            <select name='ddd' id='ddd' className='form-select' value={formData.ddd} onChange={handleInputChange}
                                                required={isDropdown} disabled={isInputText}>
                                                <option selected disabled value={''}>Selecione o código de área</option>
                                                {selectedProvince.ddd.map((prefix) => (
                                                    <option value={prefix}>
                                                        {prefix}
                                                    </option>
                                                ))}
                                            </select>
                                            <button className="btn btn-success" type="button" id="button-addon2" onClick={handlePhonePrefixBtnClick} disabled={isInputText}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                </svg> Salvar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <input type="text" disabled className="form-control" value={formData.ddd} placeholder='Selecione o DDD'
                                            aria-describedby="button-addon2" />
                                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={handlePhonePrefixBtnClick} disabled={isInputText}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> Editar
                                            </button>
                                        </>
                                    )
                                }
                            </div>

                        </div>


                        <div className='col-md-3'>
                            <label className='form-label'>DDD de outro Estado</label>
                            <div className="input-group mb-3">

                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="ddd-text-radio"
                                        id="ddd-text-radio"
                                        checked={isInputText}
                                        onChange={handleDDDRadioChange}
                                    />
                                </div>

                                {
                                    editPhonePrefixField2 ? (
                                        <>
                                            <input type='number' className={inputClass} name='ddd' id='ddd'
                                                value={formData.ddd} onChange={handleInputChange}
                                                placeholder='00' min={11} max={99}
                                                required={isInputText} disabled={isDropdown} />
                                            <button className="btn btn-success" type="button" id="button-addon2" onClick={handlePhonePrefix2BtnClick} disabled={isDropdown}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                </svg> Salvar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <input type="text" disabled className="form-control" value={formData.ddd} placeholder='DDD (outra UF)'
                                             aria-describedby="button-addon2" />
                                            <button className="btn btn-primary" type="button" id="button-addon2" disabled={isDropdown} onClick={handlePhonePrefix2BtnClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> Editar
                                            </button>
                                        </>
                                    )
                                }
                            </div>

                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>8 - Celular | Whatsapp</label>
                            <div className="input-group mb-3">

                                {
                                    editPhoneField ? (
                                        <>
                                            <span className='input-group-text' id='whatsapp-icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                                </svg>
                                            </span>
                                            <input type='number' className='form-control' name='phone' id='phone' min='10000000' max='999999999'
                                                value={formData.phone} onChange={handleInputChange}
                                                placeholder='Números, sem DDD, pontos ou traços. Ex.: 9 9888 9999' required />
                                            <button className="btn btn-success" type="button" id="button-addon2" onClick={handlePhoneBtnClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                                </svg> Salvar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className='input-group-text' id='whatsapp-icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                                </svg>
                                            </span>
                                            <input type="text" disabled className="form-control" value={formData.phone} placeholder='Números, sem DDD, pontos ou traços. Ex.: 9 9888 9999'
                                             aria-describedby="button-addon2" />
                                            <button className="btn btn-primary" type="button" id="button-addon2" onClick={handlePhoneBtnClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg> Editar
                                            </button>
                                        </>
                                    )
                                }

                            </div>
                        </div>

                        <hr />

                        <div className='col-md-6'>
                            <label className='form-label'>9 - Categoria</label>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value={utils.category.A}
                                    checked={formData.category === utils.category.A}
                                    onChange={handleInputChange}
                                    id='category' />
                                <label className='form-check-label'>
                                    "A" - Motocicleta
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value={utils.category.B}
                                    checked={formData.category === utils.category.B}
                                    onChange={handleInputChange}
                                    id='category' />
                                <label className='form-check-label'>
                                    "B" - Automóvel
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value={utils.category.AB}
                                    checked={formData.category === utils.category.AB}
                                    onChange={handleInputChange}
                                    id='category' />
                                <label className='form-check-label'>
                                    "A" e "B" - Motocicleta e Automóvel
                                </label>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <label className='form-label'>10 - Veículo</label>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='vehicle'
                                    value={utils.vehicle.instrutor}
                                    checked={formData.vehicle === utils.vehicle.instrutor}
                                    onChange={handleInputChange}
                                    id='vehicle' />
                                <label className='form-check-label'>
                                    Veículo do INSTRUTOR
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='vehicle'
                                    value={utils.vehicle.aluno}
                                    checked={formData.vehicle === utils.vehicle.aluno}
                                    onChange={handleInputChange}
                                    id='vehicle' />
                                <label className='form-check-label'>
                                    Veículo do ALUNO
                                </label>
                            </div>
                            <div className='form-check'>
                                <input className='form-check-input'
                                    type='radio'
                                    name='vehicle'
                                    value={utils.vehicle.ambos}
                                    checked={formData.vehicle === utils.vehicle.ambos}
                                    onChange={handleInputChange}
                                    id='vehicle' />
                                <label className='form-check-label'>
                                    Veículo do INSTRUTOR / do ALUNO (a combinar)
                                </label>
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <label className='form-label'>11 - Descrição do veículo (opcional)</label>
                            <textarea className='form-control' name='description' id='description'
                                value={formData.description} onChange={handleInputChange} rows={3}
                                placeholder='Ajude o aluno a te escolher, fale um pouco sobre você, seu perfil profissional, veiculo que utiliza, tempo na carreira, etc...'></textarea>
                        </div>

                        <br />

                        <div className='d-grid gap-2 col-12 mx-auto'>
                            <button className='btn btn-success btn-lg shadow' type='submit'
                                /* disabled={submitBtnDisabled} */>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-check" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                </svg> Salvar Alterações
                            </button>
                        </div>

                    </div>
                </form>
            </div >

        )
}

export default EditProfileForm;