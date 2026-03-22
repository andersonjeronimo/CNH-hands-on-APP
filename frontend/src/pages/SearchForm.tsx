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
        //instrutor não faz busca
        const role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (role) {
            if (role === utils.role.instrutor) {
                navigate('/details');
            }
        }

        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
        //if (token) {
        //}
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
                else {
                    navigate('/search-result-fail');
                }
            })
            .catch((error) => console.log(error.message));

    };

    return (
        <div className='container mt-lg-5 mb-lg-5'>
            <p className="text-center"><h1>Busca por Instrutores</h1></p>
            <hr />
            {/* <div className='row g-3 align-items-center'>
                    <div className='col-md-12'>
                        <img src={Instrutores} className='rounded mx-auto img-fluid d-block shadow'
                            alt='Imagem com vários instrutores de trânsito' />
                    </div>
                </div> */}

            <form className="row g-3 needs-validation" onSubmit={handleSubmit}>

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