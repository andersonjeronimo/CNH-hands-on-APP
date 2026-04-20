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
                                {/* <td>
                                    <a className="link-body-emphasis" href={`https://api.whatsapp.com/send/?phone=${data.ddd}${data.phone}&text&type=phone_number&app_absent=0`} target="_blank" aria-label="Whatsapp">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 48 48">
                                            <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
                                        </svg>
                                    </a>
                                </td> */}
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