import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import axios from 'axios';

import TermsShort from './TermsInstructor';
import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
import instructorModel from '../assets/utils/instructor-model.json';
import utils from '../assets/utils/utils.json';

function Details() {

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

    const [message, setMessage] = useState('Se necessário, atualize as informações acerca de seu perfil (em breve)');
    const [alertClass, setAlertClass] = useState(messageClass.success);
    const [inputClass, setInputClass] = useState(inputFocusClass.default);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [selectedProvince, setSelectedProvince] = useState(provinceModel);
    const [citiesData, setCitiesData] = useState([cityModel]);//cidades por UF
    const [selectedCity, setSelectedCity] = useState(cityModel);
    const [microregionData, setMicroregionData] = useState([cityModel]);
    const [formData, setFormData] = useState(instructorModel);
    const [isCpf, setIsCpf] = useState(true);
    const [isCnpj, setIsCnpj] = useState(false);

    useEffect(() => {
        //se logado, aluno não acessa 'details'
        const role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (role) {
            if (role === utils.role.aluno) {
                navigate('/search');
            }
        }

        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        if (token) {
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
        }

        const user_id = localStorage.getItem(`${import.meta.env.VITE_ID_VAR}`);
        if (user_id) {
            //procurar um instrutor que tenha o 'user-id' retornado após o signup.tsx
            axios.get(`${import.meta.env.VITE_INSTRUCTOR_API_USER_ID_URL}/${user_id}`)
                .then((response) => {
                    if (response.data) {
                        if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                            //verificar se já existe, carregar os dados no formulario                    
                            setFormData(response.data);
                        } else {
                            navigate('/register');
                        }
                    } else {
                        navigate('/register');
                    }
                })
                .catch((error) => {
                    setMessage(`${error.message}`);
                });
        }
        setProvinceData(Estados);
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
                .catch((error) => setMessage(error.message));
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
                .catch((error) => setMessage(error.message));

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
        } else if (isCnpj && !cnpj.isValid(_cnpj)) {
            setInputClass(inputFocusClass.danger);
            setAlertClass(messageClass.danger);
            setMessage(`Atenção: O CNPJ informado, ${formData.cnpj}, é inválido`);
            setFormData(prevState => ({
                ...prevState,
                ['cnpj']: ''
            }));


        } else if (formData.userId === "") {
            setMessage(`Acesso indevido: sem autenticação. Acessar tela de login`);
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
                                    navigate('/details', { state: response.data });
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
                    .catch((error) => setMessage(error.message));

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
                                .then((/* response */) => {

                                    //navigate('/details', { state: response.data });
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
                    .catch((error) => setMessage(error.message));
            }

        }

    };

    return (

        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-6 col-xl-4">
                        <div className="card" >
                            <div className="card-body text-center">
                                <div className="mt-0 mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        className="rounded-circle img-fluid" />
                                </div>
                                <h4 className="mb-2">Julie L. Arsenault</h4>
                                <p className="text-muted mb-4">@Programmer <span className="mx-2">|</span> <a
                                    href="#!">mdbootstrap.com</a></p>
                                <div className="mb-4 pb-2">
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-floating">
                                        <i className="fab fa-facebook-f fa-lg"></i>
                                    </button>
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-floating">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </button>
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-floating">
                                        <i className="fab fa-skype fa-lg"></i>
                                    </button>
                                </div>
                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-rounded btn-lg">
                                    Message now
                                </button>
                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                    <div>
                                        <p className="mb-2 h5">8471</p>
                                        <p className="text-muted mb-0">Wallets Balance</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="mb-2 h5">8512</p>
                                        <p className="text-muted mb-0">Income amounts</p>
                                    </div>
                                    <div>
                                        <p className="mb-2 h5">4751</p>
                                        <p className="text-muted mb-0">Total Transactions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-md-6 col-xl-4">

                        <div className="card" >
                            <div className="card-body text-center">
                                <div className="mt-0 mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                        className="rounded-circle img-fluid" />
                                </div>
                                <h4 className="mb-2">Julie L. Arsenault</h4>
                                <p className="text-muted mb-4">@Programmer <span className="mx-2">|</span> <a
                                    href="#!">mdbootstrap.com</a></p>
                                <div className="mb-4 pb-2">
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-floating">
                                        <i className="fab fa-facebook-f fa-lg"></i>
                                    </button>
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-floating">
                                        <i className="fab fa-twitter fa-lg"></i>
                                    </button>
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-floating">
                                        <i className="fab fa-skype fa-lg"></i>
                                    </button>
                                </div>
                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-rounded btn-lg">
                                    Message now
                                </button>
                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                    <div>
                                        <p className="mb-2 h5">8471</p>
                                        <p className="text-muted mb-0">Wallets Balance</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="mb-2 h5">8512</p>
                                        <p className="text-muted mb-0">Income amounts</p>
                                    </div>
                                    <div>
                                        <p className="mb-2 h5">4751</p>
                                        <p className="text-muted mb-0">Total Transactions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>



    )
}

export default Details;