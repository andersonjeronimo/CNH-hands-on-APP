import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import axios from 'axios';

import TermsShort from './TermsInstructor';

import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
import customerModel from '../assets/utils/instructor-model.json';

function RegisterForm() {

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

    const [message, setMessage] = useState('Preencha os campos abaixo');
    const [alertClass, setAlertClass] = useState(messageClass.primary);
    const [inputClass, setInputClass] = useState(inputFocusClass.default);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [selectedProvince, setSelectedProvince] = useState(provinceModel);
    const [citiesData, setCitiesData] = useState([cityModel]);//cidades por UF
    const [selectedCity, setSelectedCity] = useState(cityModel);
    const [microregionData, setMicroregionData] = useState([cityModel]);
    //const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);//cidades por microrregião

    useEffect(() => {
        setProvinceData(Estados);
        setFormData(customerModel);
    }, []);

    const [formData, setFormData] = useState(customerModel);
    const [isCpf, setIsCpf] = useState(true);
    const [isCnpj, setIsCnpj] = useState(false);
    const [passwordTest, setPasswordTest] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTest, setShowPasswordTest] = useState(false);
    const [passwordFieldMessage, setPasswordFieldMessage] = useState("");

    const handlePwdInputChange = (e: any) => {
        const { value } = e.target;
        setPasswordTest(value);
    }

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

    const handleShowPassword = async (e: any) => {
        e.preventDefault();
        const { id } = e.target;
        if (id === 'form_password') {
            setShowPassword(!showPassword);
        }
        if (id === 'form_password_test') {
            setShowPasswordTest(!showPasswordTest);
        }
    }

    const handleInputChange = async (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        //Estado===============================================
        if (name === 'state') {
            //reset DDD
            setFormData(prevState => ({
                ...prevState,
                ['ddd']: ''
            }));

            const province = provinceData.find(estado => estado.nome === value);
            setSelectedProvince(province || provinceModel);
            setFormData(prevState => ({
                ...prevState,
                ['stateId']: province?.id || 0
            }));

            //buscar cidades na API do IBGE
            const url_start = import.meta.env.VITE_IBGE_API_CITIES_START;
            const url_end = import.meta.env.VITE_IBGE_API_CITIES_END;
            const url_cities = `${url_start}${province?.id}${url_end}`;
            axios.get(url_cities)
                .then(response => {
                    if (response.data) {
                        if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                            setCitiesData(response.data)
                        }
                    } else {
                        setCitiesData([cityModel]);
                    }
                })
                .catch((error) => setMessage(error));
        }
        //Cidade===============================================
        else if (name === 'city') {
            const city = citiesData.find(_city => _city.nome === value);
            setSelectedCity(city || cityModel);
            setFormData(prevState => ({
                ...prevState,
                ['cityId']: city?.id || 0
            }));

            setFormData(prevState => ({
                ...prevState,
                ['microregionId']: city?.microrregiao.id || 0
            }));

            setFormData(prevState => ({
                ...prevState,
                ['callByMicroregion']: false
            }));

            setAlertClass(messageClass.info);
            setMessage(`Receber solicitações de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);

            //buscar cidades da microrregião na API do IBGE            
            //`https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/${city?.microrregiao.id}/municipios`
            const url_start = import.meta.env.VITE_IBGE_API_MICROREGIONS_START;
            const url_end = import.meta.env.VITE_IBGE_API_MICROREGIONS_END;
            const url_microregions = `${url_start}${city?.microrregiao.id}${url_end}`;
            axios.get(url_microregions)
                .then(response => {
                    if (response.data) {
                        if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                            setMicroregionData(response.data)
                        }
                    } else {
                        setMicroregionData([cityModel]);
                    }
                })
                .catch((error) => setMessage(error));

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
                    setAlertClass(messageClass.info);
                    setMessage(`
                        Microrregião de ${selectedCity.nome} : ${microregionData.map((city) => (` ${city.nome}`))}
                        `);
                } else {
                    setAlertClass(messageClass.info);
                    setMessage(`Receber solicitações de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);
                }
            }

        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        //Validar CPF | CNPJ
        const _cpf = formData.cpf;
        const _cnpj = formData.cnpj;

        if (isCpf && !cpf.isValid(_cpf)) {
            setInputClass(inputFocusClass.danger);
            setAlertClass(messageClass.danger);
            setMessage(`Atenção: O CPF informado, ${formData.cpf}, é inválido`);
            setFormData(prevState => ({
                ...prevState,
                ['cpf']: ''
            }));
        }
        else if (isCnpj && !cnpj.isValid(_cnpj)) {
            setInputClass(inputFocusClass.danger);
            setAlertClass(messageClass.danger);
            setMessage(`Atenção: O CNPJ informado, ${formData.cnpj}, é inválido`);
            setFormData(prevState => ({
                ...prevState,
                ['cnpj']: ''
            }));
        } else if (formData.password !== passwordTest) {
            setInputClass(inputFocusClass.danger);
            setAlertClass(messageClass.danger);
            setMessage(`Atenção: As senhas informadas não são iguais`);
            setFormData(prevState => ({
                ...prevState,
                ['password']: ''
            }));
            setPasswordTest('');
            setPasswordFieldMessage(`As senhas informadas não são iguais`)
        } else {
            //Prosseguir Cadastro de instrutores. Preencha os campos obrigatórios
            setInputClass(inputFocusClass.default);

            //Verificar se já existe o CPF | CNPJ cadastrado
            if (isCpf) {
                axios.get(`${import.meta.env.VITE_INSTRUCTOR_API_CPF_URL}/${formData.cpf}`)
                    .then((response) => {
                        if (response.data) {
                            /* if (Array.isArray(response.data) && response.data.length > 0) {
                                setMessage('Data is a non-empty array.');
                            } else */
                            if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                                //setMessage('Data is a non-empty object.');
                                setAlertClass(messageClass.danger);
                                setMessage(`Já existe um usuário com o CPF ${formData.cpf} cadastrado.`);
                                alert(`Já existe um usuário com o CPF ${formData.cpf} cadastrado.`);
                                setFormData(prevState => ({
                                    ...prevState,
                                    ['cpf']: ''
                                }));
                            }
                        } else {
                            //setMessage('Response data is empty or null.');                            
                            axios.post(import.meta.env.VITE_INSTRUCTOR_API_URL, formData)
                                .then((response) => {
                                    navigate('/register-result', { state: response.data });
                                    /* if (response.data) {
                                        if (Array.isArray(response.data) && response.data.length > 0) {
                                            //response.data -> ID
                                            navigate('/register-result', { state: response.data });
                                            //Passar ID e carregar o cliente na tela de resultado                                            
                                        }
                                    } */
                                })
                                .catch((error) => setMessage(error));
                        }
                    })
                    .catch((error) => setMessage(error));

            } else if (isCnpj) {
                axios.get(`${import.meta.env.VITE_INSTRUCTOR_API_CNPJ_URL}/${formData.cnpj}`)
                    .then((response) => {
                        if (response.data) {
                            /* if (Array.isArray(response.data) && response.data.length > 0) {
                                setMessage('Data is a non-empty array.');
                            } else */
                            if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                                //setMessage('Data is a non-empty object.');
                                setAlertClass(messageClass.danger);
                                setMessage(`Já existe um usuário com o CNPJ ${formData.cnpj} cadastrado.`);
                                alert(`Já existe um usuário com o CNPJ ${formData.cnpj} cadastrado.`);
                                setFormData(prevState => ({
                                    ...prevState,
                                    ['cnpj']: ''
                                }));
                            }
                        } else {
                            //setMessage('Response data is empty or null.');
                            axios.post(import.meta.env.VITE_INSTRUCTOR_API_URL, formData)
                                .then((response) => {
                                    navigate('/register-result', { state: response.data });
                                    /* if (response.data) {
                                        if (Array.isArray(response.data) && response.data.length > 0) {
                                            //response.data -> ID
                                            navigate('/register-result', { state: response.data });
                                            //Passar ID e carregar o cliente na tela de resultado                                            
                                        }
                                    } */
                                })
                                .catch((error) => setMessage(error));
                        }
                    })
                    .catch((error) => setMessage(error));
            }

        }

    };

    return (
        <div className='container mt-lg-5 mb-lg-5'>
            <p className="text-center"><h1>Cadastro de Instrutores</h1></p>
            <hr />
            {/* <div className='row g-3 align-items-center'>
                    <div className='col-md-12'>
                        <img src={Instrutores} className='rounded mx-auto img-fluid d-block shadow'
                            alt='Imagem com vários instrutores de trânsito' />
                    </div>
                </div> */}

            <form className="row g-3 needs-validation" onSubmit={handleSubmit} >

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
                        <select name='state' id='state' className='form-select' value={formData.state} onChange={handleInputChange} required>
                            <option selected disabled value={''}>Selecione o Estado</option>
                            {provinceData.map((option) => (
                                <option key={option.id} value={option.nome}>
                                    {option.sigla} - {option.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>2 - Cidade</label>
                        <select name='city' id='city' className='form-select' value={formData.city} onChange={handleInputChange} required>
                            <option selected disabled value={''}>Selecione a cidade</option>
                            {citiesData.map((option) => (
                                <option key={option.id} value={option.nome}>
                                    {option.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='col-md-12'>
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

                    <div className='col-md-6'>
                        <label className='form-label'>4 - Nome</label>
                        <input type='text' className='form-control' name='firstname' id='firstname'
                            value={formData.firstname} onChange={handleInputChange} required autoComplete='off' />
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label'>5 - Sobrenome</label>
                        <input type='text' className='form-control' name='lastname' id='lastname'
                            value={formData.lastname} onChange={handleInputChange} required />
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label'>6 - Email</label>
                        <div className='input-group'>
                            <span className='input-group-text' id='email'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                                    <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                                    <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                                </svg>

                            </span>
                            <input type='email' className='form-control' name='email' id='email'
                                value={formData.email} onChange={handleInputChange}
                                aria-describedby='email' required />
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <label className='form-label'>7 - Senha</label>
                        <div className='input-group'>
                            <span className='input-group-text' id='form_password' onClick={handleShowPassword}>
                                {
                                    showPassword ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                }
                            </span>
                            <input type={showPassword ? 'text' : 'password'} className='form-control' name='password' id='password'
                                value={formData.password} onChange={handleInputChange}
                                aria-describedby='passwordHelpBlock' required />
                        </div>
                        <div id="passwordHelpBlock" className="form-text">
                            <strong>{passwordFieldMessage}</strong>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <label className='form-label'>8 - Repetir Senha</label>
                        <div className='input-group'>
                            <span className='input-group-text' id='form_password_test' onClick={handleShowPassword}>
                                {
                                    showPasswordTest ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                }
                            </span>
                            <input type={showPasswordTest ? 'text' : 'password'} className='form-control' name='password_test' id='password_test'
                                value={passwordTest} onChange={handlePwdInputChange}
                                aria-describedby='passwordHelpBlock' required />
                        </div>
                        <div id="passwordHelpBlock" className="form-text">
                            <strong>{passwordFieldMessage}</strong>
                        </div>
                    </div>


                    <div className='col-md-1'>
                        <label className='form-label'>9 - DDD</label>
                        <select name='ddd' id='ddd' className='form-select' value={formData.ddd} onChange={handleInputChange} required>
                            <option selected value={'00'}>00</option>
                            {selectedProvince.ddd.map((ddd) => (
                                <option value={ddd}>
                                    {ddd}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>10 - Celular | Whatsapp</label>
                        <div className='input-group'>
                            <span className='input-group-text' id='email'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                            </span>
                            <input type='number' className='form-control' name='phone' id='phone' min='10000000' max='999999999'
                                value={formData.phone} onChange={handleInputChange}
                                placeholder='Apenas números, sem DDD, pontos ou traços. Ex.: 9 9888 9999' required />
                        </div>

                    </div>

                    <div className='col-md-5'>
                        <label className='form-label'>11 - CPF</label>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="cpf-radio"
                                id="cpf-radio"
                                checked={isCpf}
                                onChange={handleCpfCnpjRadioChange}
                            />

                            <input type='text' className={inputClass} name='cpf' id='cpf'
                                value={formData.cpf} onChange={handleInputChange}
                                placeholder='Apenas números, sem pontos ou traços. Ex.: 111 222 333 44'
                                required={isCpf} disabled={isCnpj} />
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>12 - CNPJ</label>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="radio"
                                name="cnpj-radio"
                                id="cnpj-radio"
                                checked={isCnpj}
                                onChange={handleCpfCnpjRadioChange}
                            />

                            <input type='text' className={inputClass} name='cnpj' id='cnpj'
                                value={formData.cnpj} onChange={handleInputChange}
                                placeholder='Apenas números, sem pontos ou traços. Ex.: 11 222 333 0001 22'
                                required={isCnpj} disabled={isCpf} />
                        </div>
                    </div>

                    <div className='col-md-5'>

                    </div>

                    <div className='col-md-12'>
                        <label className='form-label'>13 -Descrição do veículo (opcional)</label>
                        <textarea className='form-control' name='description' id='description'
                            value={formData.description} onChange={handleInputChange} rows={3}
                            placeholder='Se for veículo próprio, você pode colocar aqui a marca, modelo, tipo de câmbio, etc. Isso pode ajudar na escolha do instrutor'></textarea>
                    </div>

                    <hr />

                    <div className='col-md-4'>
                        <label className='form-label'>14 - Status</label>
                        <div className='form-check'>
                            <input className='form-check-input'
                                type='radio'
                                name='status'
                                value='Ativo'
                                checked={formData.status === 'Ativo'}
                                onChange={handleInputChange}
                                id='status' />
                            <label className='form-check-label'>
                                Ativo
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input'
                                type='radio'
                                name='status'
                                value='Pausado'
                                checked={formData.status === 'Pausado'}
                                onChange={handleInputChange}
                                id='status' disabled />
                            <label className='form-check-label'>
                                Pausado
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input'
                                type='radio'
                                name='status'
                                value='Inativo'
                                checked={formData.status === 'Inativo'}
                                onChange={handleInputChange}
                                id='status' disabled />
                            <label className='form-check-label'>
                                Inativo
                            </label>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <label className='form-label'>15 - Categoria</label>
                        <div className='form-check'>
                            <input className='form-check-input'
                                type='radio'
                                name='category'
                                value='A'
                                checked={formData.category === 'A'}
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
                                value='B'
                                checked={formData.category === 'B'}
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
                                value='AB'
                                checked={formData.category === 'AB'}
                                onChange={handleInputChange}
                                id='category' />
                            <label className='form-check-label'>
                                "A" e "B" - Motocicleta e Automóvel
                            </label>
                        </div>
                    </div>

                    <div className='col-md-4'>
                        <label className='form-label'>16 - Veículo</label>
                        <div className='form-check'>
                            <input className='form-check-input'
                                type='radio'
                                name='vehicle'
                                value='Proprio'
                                checked={formData.vehicle === 'Proprio'}
                                onChange={handleInputChange}
                                id='vehicle' />
                            <label className='form-check-label'>
                                Veículo PRÓPRIO
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input'
                                type='radio'
                                name='vehicle'
                                value='Aluno'
                                checked={formData.vehicle === 'Aluno'}
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
                                value='Combinar'
                                checked={formData.vehicle === 'Combinar'}
                                onChange={handleInputChange}
                                id='vehicle' />
                            <label className='form-check-label'>
                                Veículo PRÓPRIO ou do ALUNO (a combinar)
                            </label>
                        </div>
                    </div>

                    <hr />

                    <div className='col-md-12'>
                        <label className='form-label'>17 - Termos e Condições Gerais de uso</label>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                name="agree"
                                id="agree"
                                checked={formData.agree}
                                onChange={handleInputChange}
                                required />

                            <label className="form-check-label">
                                Declaro que li e concordo com os <span>
                                    <a href="#" role="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Termos de Uso da CNH Na Mão</a>
                                </span>, assumindo integral responsabilidade pelas informações prestadas e pelos serviços oferecidos.

                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Termos e Condições Gerais de Uso</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                <TermsShort></TermsShort>

                                            </div>
                                            <div className="modal-footer">

                                                <div className="form-check">
                                                    <input className="form-check-input"
                                                        type="checkbox"
                                                        name="agree"
                                                        id="agree"
                                                        checked={formData.agree}
                                                        onChange={handleInputChange}
                                                        required />
                                                    <label className="form-check-label">
                                                        Li e concordo com os termos
                                                    </label>
                                                </div>

                                                <hr />

                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className='d-grid gap-2 col-12 mx-auto'>
                        <button className='btn btn-primary btn-lg shadow' type='submit'
                                /* disabled={submitBtnDisabled} */>
                            Cadastrar Instrutor
                        </button>
                    </div>

                </div>
            </form>

        </div >

    )
}

export default RegisterForm;