import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import TermsCustomer from './TermsCustomer';
import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import cityModel from '../assets/utils/cidade-model.json';
import searchFormModel from '../assets/utils/search-form-model.json';
import paginationModel from '../assets/utils/pagination.json';
import utils from '../assets/utils/utils.json';


function SearchForm() {

    const navigate = useNavigate();
    //const location = useLocation();

    const messageClass = {
        primary: 'alert alert-primary',
        success: 'alert alert-success',
        danger: 'alert alert-danger',
        warning: 'alert alert-warning',
        info: 'alert alert-info'
    }

    const [message, setMessage] = useState('Localize o(s) instrutor(es) preenchendo os campos abaixo');
    const [alertClass, setAlertClass] = useState(messageClass.success);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [citiesData, setCitiesData] = useState([cityModel]);//cidades por UF
    const [selectedCity, setSelectedCity] = useState(cityModel);
    const [microregionData, setMicroregionData] = useState([cityModel]);
    const [formData, setFormData] = useState(searchFormModel);


    useEffect(() => {
        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        if (!token) {
            navigate('/home');
        }
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

        //instrutor não faz busca
        const role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (role) {
            if (role === utils.role.instrutor) {
                navigate('/details');
            }
        }        
        
        setProvinceData(Estados);
    }, []);

    const handleInputChange = async (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        //Estado===============================================
        if (name === 'state') {

            const province = provinceData.find(estado => estado.nome === value);
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
                }).catch((error) => console.log(error.message));
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
            setMessage(`Localizar instrutores de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);

            //buscar cidades da microrregião na API do IBGE            
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
                .catch((error) => console.log(error.message));

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
                    setMessage(`Para efetuar a busca, é necessário concordar com os termos e condições`);
                    //setSubmitBtnDisabled(true);
                }
            }
            if (name === 'callByMicroregion') {
                if (checked) {
                    setAlertClass(messageClass.info);
                    setMessage(`Microrregião de ${selectedCity.nome} : ${microregionData.map((city) => (` ${city.nome}`))}`);
                } else {
                    setAlertClass(messageClass.info);
                    setMessage(`Localizar instrutores de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);
                }
            }

        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        paginationModel.pageNumber = 1;
        paginationModel.pageSize = Number(import.meta.env.VITE_PAGE_SIZE);

        const payload = {
            pagination: paginationModel,
            query: formData
        }

        axios
            .post(import.meta.env.VITE_INSTRUCTOR_SEARCH_API_URL, payload)
            .then((response) => {
                if (response.data) {

                    if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                        navigate('/search-result', { state: { data: response.data, query: formData } });
                    } else if (Array.isArray(response.data) && response.data.length > 0) {
                        navigate('/search-result', { state: { data: response.data, query: formData } });
                    }
                    else {
                        navigate('/search-result-fail');
                    }
                }
            })
            .catch((error) => {
                setMessage(`${error.message} : Sua sessão expirou. Efetue Login novamente.`);
                alert(`${error.message} : Sua sessão expirou. Efetue Login novamente.`);
                console.log(error.message);
            });

    };

    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <p className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg></p>
            <p className="text-center"><h1> Busca por Instrutores</h1></p>
            <hr />
            <div className="alert alert-info" role="alert">
                <h5 className="alert-heading">Caro aluno</h5>
                <p>
                    Nossa plataforma exibe instrutores autônomos para você finalizar seu processo de habilitação fazendo as aulas práticas.
                </p>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg> Se você chegou até aqui, você já completou toda a parte teórica (exames, curso e prova) e já está com a LADV disponível.
                </p>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg> <strong>Se você ainda não fez esses procedimentos você pode tirar suas dúvidas com o instrutor prático, mas já pode adiantar o procedimento acessando:</strong>
                </p>
                <p>
                    <ol>
                        <li>
                            <a href="https://www.gov.br/transportes/pt-br/cnh-do-brasil" target='_blank'>CNH do BRASIL <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.gov.br/pt-br" target='_blank'>GOV.BR <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                            </svg>
                            </a>
                        </li>
                    </ol>
                </p>

            </div>

            <div className="alert alert-info col-md-12" role="alert">
                <h5 className="alert-heading">Encontre seu instrutor de direção em poucos cliques:</h5>
                Aluno, aqui você apenas busca por Estado, cidade, categoria e tipo de veículo e escolha o instrutor ideal para você.
                <br />
                Entre em contato diretamente com o profissional, negocie horários, locais e tire todas as suas dúvidas com liberdade e praticidade.
                <br />
                <strong><i>Simples, rápido e sem burocracia.</i></strong>
                <br />
                Importante: para iniciar as aulas práticas, é necessário já ter concluído os exames e a parte teórica, além de portar sua LADV (Licença de Aprendizagem de Direção Veicular).
                <br />
                Converse com seu instrutor e se informe.
            </div>
            <form className="row g-3 needs-validation" onSubmit={handleSubmit}>

                <div className='row g-3 align-items-center'>

                    <div className='col-md-12'>
                        <div className={alertClass} role='alert'>
                            <p>
                                <strong>
                                    {message}
                                </strong>
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
                                Buscar instrutores na microrregião (cidades vizinhas)?
                            </label>
                        </div>
                    </div>

                    <hr />

                    <div className='col-md-6'>
                        <label className='form-label'>4 - Categoria</label>
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
                                "B" - Carro
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
                                "A" e "B" - Motocicleta e Carro
                            </label>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>5 - Veículo</label>
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

                    <hr />

                    <div className='col-md-12'>
                        <label className='form-label'>6 - Termos e Condições Gerais de uso</label>
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
                                    <a href="#" role="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Termos de Uso da CNH Na Mão</a></span>
                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Termos e Condições Gerais de Uso</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">

                                                <TermsCustomer></TermsCustomer>

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
                        <button className='btn btn-success btn-lg shadow' type='submit'
                                /* disabled={submitBtnDisabled} */>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                            Buscar Instrutor
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default SearchForm;