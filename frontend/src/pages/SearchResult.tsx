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
    const [maxPages, setMaxPages] = useState(0);
    const [queryData, setQueryData] = useState({});
    const [paginationData, setPaginationData] = useState(paginationModel);

    useEffect(() => {

        paginationModel.pageNumber = 1;
        paginationModel.pageSize = Number(import.meta.env.VITE_PAGE_SIZE);
        setPaginationData(paginationModel);

        setTableData(location.state.data);
        setQueryData(location.state.query);
        setMaxPages(Math.ceil(Number(location.state.total) / paginationModel.pageSize));

    }, []);

    const handlePagination = async (e: any) => {
        //e.preventDefault();
        const { name } = e.target;
        const api_url = import.meta.env.VITE_INSTRUCTOR_SEARCH_API_URL;
        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);

        if (name === 'nextPage') {
            if (paginationData.pageNumber < maxPages) {

                paginationData.pageNumber++;

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
                        if (typeof data.result[0] === 'object' && Object.keys(data.result[0]).length > 0) {
                            setTableData(data.result[0].data);
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
                        if (typeof data.result[0] === 'object' && Object.keys(data.result[0]).length > 0) {
                            setTableData(data.result[0].data);
                        }
                        //else if (Array.isArray(data.result) && data.result.length > 0) {
                        //    setTableData(data.result);
                        //}
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

                <a className="btn btn-primary w-75 py-2 shadow-lg" href="/search">
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
                        <th scope='col'>Conversar</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tableData.map(data => (
                            <tr className='table-light'>

                                <td>
                                    {
                                        data.cloudinary_secure_url ? (
                                            <img src={data.cloudinary_secure_url} width={64} className="rounded img-thumbnail" alt="..." />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                            </svg>
                                        )
                                    }

                                </td>
                                <td>
                                    <p className="fs-4">{data.firstname}</p>
                                </td>
                                <td>
                                    <a href="#" role="button" className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                        data-bs-toggle="modal" data-bs-target={`#${data.userId}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
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
                        {
                            paginationData.pageNumber === 1 ?
                                <button disabled className='btn btn-primary shadow' name='previousPage' id='previousPage' onClick={handlePagination}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                    </svg>
                                    Anterior
                                </button>
                                :
                                <button className='btn btn-primary shadow' name='previousPage' id='previousPage' onClick={handlePagination}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                    </svg>
                                    Anterior
                                </button>
                        }
                    </li>
                    <li className="page-item"><a className="page-link" href="#">Página {paginationData.pageNumber} de {maxPages}</a></li>
                    <li className="page-item">
                        {
                            paginationData.pageNumber < maxPages ?
                                <button className='btn btn-success shadow' name='nextPage' id='nextPage' onClick={handlePagination}>
                                    Próxima
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                        <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </button>
                                :
                                <button disabled className='btn btn-success shadow' name='nextPage' id='nextPage' onClick={handlePagination}>
                                    Próxima
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                        <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </button>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default SerchResult;