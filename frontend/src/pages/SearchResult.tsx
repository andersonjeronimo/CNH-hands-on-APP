import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
declare var $: any;

import instructorModel from '../assets/utils/instructor-model.json';
import paginationModel from '../assets/utils/pagination.json';
import LogoutModal from './partials/LogoutModal';
import ChatModal from './partials/ChatModal';

//import aluno1 from '../assets/images/aluno_01.png';
//import aluna1 from '../assets/images/aluna_01.png';
//import aluno2 from '../assets/images/aluno_02.png';
//import aluna2 from '../assets/images/aluna_02.png';
import avatar from '../assets/images/profile-check.svg';

//import { data } from 'jquery';

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
            <table className="table text-center">
                <thead>
                    <tr className='table-light'>
                        <th scope="col">Foto</th>
                        <th scope="col">Instrutor</th>                        
                        <th scope='col'>Detalhes</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tableData.map(data => (
                            <tr className='table-light'>

                                <td>
                                    {
                                        data.cloudinary_secure_url ? (
                                            <img src={data.cloudinary_secure_url} width={64} className="rounded-pill " alt="..." />
                                        ) : (
                                            <img src={avatar} width={64} className="rounded" alt="..." />
                                        )
                                    }

                                </td>
                                <td>
                                    <p className="fs-4">{data.firstname}</p>
                                </td>                                
                                <td>
                                    <a href="#" role="button" data-bs-toggle="modal" data-bs-target={`#${data.userId}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-person-vcard" viewBox="0 0 16 16">
                                            <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                                            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                                        </svg>
                                    </a>
                                    <ChatModal id={data.userId} data={data}></ChatModal>
                                </td>                                
                            </tr>

                        ))
                    }

                </tbody>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className='btn btn-primary shadow' name='previousPage' id='previousPage' onClick={handlePagination}>
                            Página Anterior
                        </button>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">Página {paginationData.pageNumber}</a></li>
                    <li className="page-item">
                        <button className='btn btn-success shadow' name='nextPage' id='nextPage' onClick={handlePagination}>
                            Próxima Página
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default SerchResult;