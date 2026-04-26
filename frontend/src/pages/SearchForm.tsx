import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import * as $ from 'jquery';
declare var $: any;

import TermsCustomer from './TermsCustomer';
import Estados from '../assets/utils/estados.json';
import provinceModel from '../assets/utils/estado-model.json';
import type { ProvinceType, CityType } from '../assets/utils/AppTypes';
import cityModel from '../assets/utils/cidade-model.json';
//import microregionModel from '../assets/utils/microrregiao-model.json';
import searchFormModel from '../assets/utils/search-form-model.json';
import paginationModel from '../assets/utils/pagination.json';
import LogoutModal from './partials/LogoutModal';
import cepModel from '../assets/utils/cep-model.json';

import utils from '../assets/utils/utils.json';
import SearchModal from './partials/SearchModal';


function SearchForm() {

    const navigate = useNavigate();

    const [message, setMessage] = useState('Localize o(s) instrutor(es) preenchendo os campos abaixo');
    const [alertClass, setAlertClass] = useState(utils.messageClass.primary);
    const [provinceData, setProvinceData] = useState([provinceModel]);
    const [citiesData, setCitiesData] = useState([cityModel]);//cidades por UF
    const [selectedCity, setSelectedCity] = useState(cityModel);
    const [microregionData, setMicroregionData] = useState([cityModel]);

    const [formData, setFormData] = useState(searchFormModel);
    // New!
    const [cepData, setCEPData] = useState(cepModel);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        $('#introStaticBackdrop').modal('show');
        setProvinceData(Estados);
    }, []);

    const loadCities = async (province: ProvinceType) => {
        //const province = provinceData.find(estado => estado.nome === stateName) as ProvinceType;
        setSelectedCity(cityModel);
        setMicroregionData([cityModel]);

        setFormData(prevState => ({
            ...prevState,
            ['stateId']: province.id,
            ['state']: province.nome,
            ['cityId']: 0,
            ['city']: '',
            ['microregionId']: 0,
            ['callByMicroregion']: false
        }));

        //buscar cidades na API do IBGE            
        const url_start = import.meta.env.VITE_IBGE_API_CITIES_START;
        const url_end = import.meta.env.VITE_IBGE_API_CITIES_END;
        //const url_cities = `${url_start}${province?.id}${url_end}`;
        const url_cities = `${url_start}${province.id}${url_end}`;

        const response = await fetch(url_cities, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            setMessage(`${response.status}`);
        }

        const data = await response.json();
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            setCitiesData(data);
            setAlertClass(utils.messageClass.warning);
            setMessage(`Selecione uma cidade`);
        }
        return data;

    }

    const loadMicroregionCities = async (city: CityType) => {
        //const city = citiesData.find(_city => _city.nome === cityName);
        setSelectedCity(city);
        setFormData(prevState => ({
            ...prevState,
            ['cityId']: city.id,
            ['city']: city.nome,
            ['microregionId']: city.microrregiao.id,
            ['callByMicroregion']: false
        }));

        setAlertClass(utils.messageClass.warning);
        setMessage(`Localizar instrutores de cidades vizinhas? Selecione no campo 3 (Microrregião) deste formulário`);

        //buscar cidades da microrregião na API do IBGE            
        const url_start = import.meta.env.VITE_IBGE_API_MICROREGIONS_START;
        const url_end = import.meta.env.VITE_IBGE_API_MICROREGIONS_END;
        const url_microregions = `${url_start}${city.microrregiao.id}${url_end}`;

        const response = await fetch(url_microregions, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            setMessage(`${response.status}`);
        }

        const data = await response.json();

        if (typeof data === 'object' && Object.keys(data).length > 0) {
            setMicroregionData(data);
        }
    }


    const searchLocationByCEP = async () => {

        setIsLoading(true);

        const brasil_api_url = `${import.meta.env.VITE_BRASIL_API_CEP_URL}${cepData.cep}`;

        const response = await fetch(brasil_api_url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 500) {
            setIsLoading(false);
            setMessage(`Erro no servidor. Busca por CEP indisponível.`);
        }
        else if (response.status === 404) {
            setIsLoading(false);
            setMessage(`Erro no servidor. Busca por CEP indisponível.`);
        }
        else {
            const data = await response.json();
            if (typeof data === 'object' && Object.keys(data).length > 0) {
                //{
                //    "cep": "89010025",
                //    "state": "SC",
                //    "city": "Blumenau",
                //    "neighborhood": "Centro",
                //    "street": "Rua Doutor Luiz de Freitas Melro",
                //    "service": "viacep"
                //}
                setCEPData(data);

                const province = provinceData.find(estado => estado.sigla === data.state) as ProvinceType;
                setFormData(prevState => ({
                    ...prevState,
                    ['state']: province.nome,
                    ['stateId']: province.id,
                }));

                //https://servicodados.ibge.gov.br/api/docs/localidades#api-Municipios-municipiosMunicipioGet
                //VER OPÇÃO ACIMA: CARREGAR APENAS UMA CIDADE POR ID AMIGÁVEL

                let city;

                loadCities(province).then(async (cities) => {
                    if (typeof cities === 'object' && Object.keys(cities).length > 0) {
                        city = cities.find((_city: { nome: any; }) => _city.nome === data.city) as CityType;

                        if (city) {
                            setSelectedCity(city);
                            await loadMicroregionCities(city);
                        }
                        setIsLoading(false);

                    }
                    setIsLoading(false);
                });

            }
            setIsLoading(false);

        }
    };

    const handleCEPInputChange = async (e: any) => {
        const { name, value } = e.target;
        setCEPData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChange = async (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        //Estado===============================================
        if (name === 'state') {
            const province = provinceData.find(estado => estado.nome === value) as ProvinceType;
            await loadCities(province);
        }
        //Cidade===============================================
        else if (name === 'city') {
            const city = citiesData.find(_city => _city.nome === value) as CityType;
            await loadMicroregionCities(city);
        }
        //Termos e condições===================================
        else if (type === 'checkbox') {
            if (name === 'agree') {
                if (checked) {
                    setAlertClass(utils.messageClass.warning);
                    setMessage(`Li e concordo com os termos e condições`);
                    //setSubmitBtnDisabled(false);
                } else {
                    setAlertClass(utils.messageClass.danger);
                    setMessage(`Para efetuar a busca, é necessário concordar com os termos e condições`);
                    //setSubmitBtnDisabled(true);
                }
            }
            if (name === 'callByMicroregion') {
                if (checked) {
                    setAlertClass(utils.messageClass.warning);
                    setMessage(`Microrregião de ${selectedCity.nome} : ${microregionData.map((city) => (` ${city.nome}`))}`);
                } else {
                    setAlertClass(utils.messageClass.warning);
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

        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);

        const api_url = `${import.meta.env.VITE_INSTRUCTOR_SEARCH_API_URL}`;

        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (response.status === 500) {
            setAlertClass(utils.messageClass.danger);
            setMessage(`Erro no servidor. Tente novamente mais tarde.`);
        }

        const data = await response.json();

        if (data.status === 401) {
            setMessage(`${data.status} : Sua sessão expirou. Efetue Login novamente.`);
            $('#logoutModal').modal('show');

        } else if (data.status === 404) {
            navigate('/search-result-fail', { state: { data: data.result, query: formData } });
        }
        else {
            if (data.status === 200) {
                if (typeof data.result === 'object' && Object.keys(data.result).length > 0) {
                    navigate('/search-result', { state: { data: data.result, query: formData } });
                } else if (Array.isArray(data.result) && data.result.length > 0) {
                    navigate('/search-result', { state: { data: data.result, query: formData } });
                }
            }
        }

    };

    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <LogoutModal></LogoutModal>
            <SearchModal></SearchModal>
            <p className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg></p>
            <p className="text-center"><h1> Buscar Instrutores</h1></p>
            <hr />
            <div className='col-md-12'>
                <div className={alertClass} role='alert'>
                    {
                        isLoading ? (
                            <>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>  <strong> Consultando CEP ...</strong>
                            </>

                        ) : (
                            <p>
                                {message}
                            </p>
                        )
                    }
                </div>
            </div>


            <div className="row g-3 align-items-center">
                <div className='col-md-6'>
                    <div className='alert alert-primary'>

                        <label className='form-label'>* Buscar por CEP [<strong>opcional</strong>]</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="warningrme o CEP" aria-label="CEP" aria-describedby="button-addon"
                                name='cep' id='cep' value={cepData.cep} onChange={handleCEPInputChange} />
                            <button className="btn btn-primary shadow" onClick={searchLocationByCEP}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-buildings" viewBox="0 0 16 16">
                                    <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
                                    <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
                                </svg> Buscar Estado e Cidade por CEP</button>
                        </div>
                    </div>
                </div>

                <div className='col-md-6'>

                </div>

            </div>

            <form className="row g-3 align-items-center needs-validation" onSubmit={handleSubmit}>

                <div className='col-md-6'>
                    <label className='form-label'>1 - Estado</label>
                    <select name='state' id='state' className='form-select' value={formData.state} onChange={handleInputChange} required>
                        <option disabled value={''}>Selecione o Estado</option>
                        {provinceData.map((option) => (
                            <option key={option.id} value={option.nome} selected={option.nome === formData.state}>
                                {option.sigla} - {option.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='col-md-6'>
                    <label className='form-label'>2 - Cidade</label>
                    <select name='city' id='city' className='form-select' value={formData.city} onChange={handleInputChange} required>
                        <option selected disabled value={''}>Selecione a Cidade</option>
                        {citiesData.map((option) => (
                            <option key={option.id} value={option.nome}>
                                {option.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='col-md-6'>
                    <div className='alert alert-warning'>
                        <label className='form-label'><strong>3 - Microrregião</strong></label>
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
                </div>

                <div className='col-md-6'>

                </div>

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
                        </label>

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

                    </div>
                </div>

                <div className='d-grid gap-2 col-12 mx-auto'>
                    <button className='btn btn-success btn-lg shadow' type='submit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        Buscar Instrutor
                    </button>
                </div>


            </form>
        </div>
    )
}

export default SearchForm;