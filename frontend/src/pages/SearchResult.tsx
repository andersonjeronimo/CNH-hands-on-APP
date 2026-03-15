import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import instructorModel from '../assets/utils/instructor-model.json';
import paginationModel from '../assets/utils/pagination.json';

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

        if (name === 'nextPage') {
            if (tableData.length > 0) {

                if (tableData.length === paginationData.pageSize) {
                    paginationData.pageNumber++;
                }

                const payload = {
                    pagination: paginationData,
                    query: queryData
                }
                axios
                    .post(import.meta.env.VITE_INSTRUCTOR_SEARCH_API_URL, payload)
                    .then((response) => {
                        if (response.data) {
                            if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                                setTableData(response.data);
                            }
                        }
                    })
                    .catch((error) => console.log(error.message));
            }

        }
        if (name === 'previousPage') {
            if (paginationData.pageNumber > 1) {
                paginationData.pageNumber--;

                const payload = {
                    pagination: paginationData,
                    query: queryData
                }

                axios
                    .post(import.meta.env.VITE_INSTRUCTOR_SEARCH_API_URL, payload)
                    .then((response) => {
                        if (response.data) {
                            if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                                setTableData(response.data);
                            }
                        }
                    })
                    .catch((error) => console.log(error.message));
            }
        }

    };


    return (
        <div className="container mt-lg-5 mb-lg-5">
            <p className="text-center"><h1>Instrutores Localizados</h1></p>
            <p className="text-center"><h3>Conforme critérios da busca</h3></p>
            <hr />

            {/* <nav aria-label="Page navigation example">
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
            </nav> */}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Veículo</th>
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
                                +55 ({instructor.ddd}) {instructor.phone}
                            </td>
                            <td>
                                {instructor.category}
                            </td>
                            <td>
                                {instructor.vehicle}
                            </td>
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

            <nav aria-label="Page navigation example">
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