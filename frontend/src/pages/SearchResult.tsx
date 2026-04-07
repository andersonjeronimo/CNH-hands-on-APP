import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
declare var $: any;

import instructorModel from '../assets/utils/instructor-model.json';
import paginationModel from '../assets/utils/pagination.json';
import LogoutModal from './partials/LogoutModal';

function SerchResult() {

    const location = useLocation();

    const [tableData, setTableData] = useState([instructorModel]);
    const [queryData, setQueryData] = useState({});
    const [paginationData, setPaginationData] = useState(paginationModel);

    useEffect(() => {

        setTableData(location.state.data);
        setQueryData(location.state.query);

        paginationModel.pageNumber = 1;
        paginationModel.pageSize = Number(import.meta.env.VITE_PAGE_SIZE);
        setPaginationData(paginationModel);


    }, []);

    const handlePagination = async (e: any) => {
        //e.preventDefault();
        const { name } = e.target;
        const api_url = import.meta.env.VITE_INSTRUCTOR_SEARCH_API_URL;
        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);

        if (name === 'nextPage') {
            if (tableData.length > 0) {

                if (tableData.length === paginationData.pageSize) {
                    paginationData.pageNumber++;
                }

                const payload = {
                    pagination: paginationData,
                    query: queryData
                }

                const response = await fetch(api_url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (response.status === 500) {
                    alert(`Erro no servidor. Tente novamente mais tarde.`);
                }

                const data = await response.json();

                if (data.status === 401) {
                    alert(`${data.status} : Sua sessão expirou. Efetue Login novamente.`);
                    $('#logoutModal').modal('show');
                }
                else {
                    if (data.status === 200) {
                        if (typeof data.result === 'object' && Object.keys(data.result).length > 0) {
                            setTableData(data.result);
                        } else if (Array.isArray(data.result) && data.result.length > 0) {
                            setTableData(data.result);
                        }
                    }
                }
            }

        }
        if (name === 'previousPage') {
            if (paginationData.pageNumber > 1) {
                paginationData.pageNumber--;

                const payload = {
                    pagination: paginationData,
                    query: queryData
                }

                const response = await fetch(api_url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (response.status === 500) {
                    alert(`Erro no servidor. Tente novamente mais tarde.`);
                }

                const data = await response.json();

                if (data.status === 401) {
                    alert(`${data.status} : Sua sessão expirou. Efetue Login novamente.`);
                    $('#logoutModal').modal('show');
                }
                else {
                    if (data.status === 200) {
                        if (typeof data.result === 'object' && Object.keys(data.result).length > 0) {
                            setTableData(data.result);
                        } else if (Array.isArray(data.result) && data.result.length > 0) {
                            setTableData(data.result);
                        }
                    }
                }
            }

        }

    };


    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <LogoutModal></LogoutModal>
            <p className='text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                </svg>
            </p>
            <p className="text-center"><h1>Instrutores Localizados</h1></p>
            <hr />

            <div className='text-center'>

                <a className="btn btn-primary w-100 py-2 shadow-lg" href="/search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg> Realizar Nova Busca
                </a>
            </div>
            <hr />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Contato</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((instructor) => (

                        <tr>
                            <th scope="row">
                                {instructor.firstname}
                            </th>
                            <th scope="row">
                                {instructor.city}
                            </th>
                            <td>
                                <a className="btn btn-success shadow form-control"
                                    href={`https://wa.me/55${instructor.ddd}${instructor.phone}?text=Olá!%20Te%20encontrei%20pelo%20aplicativo%20CNH%20Na%20Mão.%20Gostaria%20de%20agendar%20aulas%20de%20direção.%20Aguardo%20seu%20contato!`}
                                    role="button" target="_blank" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-whatsapp" viewBox="0 0 16 16">
                                        <path
                                            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                    </svg>
                                    Whatsapp</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className='btn btn-success shadow' name='previousPage' id='previousPage' onClick={handlePagination}>
                            Página Anterior
                        </button>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">Página {paginationData.pageNumber}</a></li>
                    <li className="page-item">
                        <button className='btn btn-primary shadow' name='nextPage' id='nextPage' onClick={handlePagination}>
                            Próxima Página
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default SerchResult;