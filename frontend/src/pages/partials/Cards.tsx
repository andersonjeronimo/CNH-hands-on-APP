import driver from '../../assets/images/driver.png';
import student from '../../assets/images/student.png';

function Cards() {
    return (

        <div className="container mt-lg-5 mb-lg-5">
            <div className='row'>
                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-body text-center">
                            <img src={driver} className="card-img-top w-50" alt="..." />
                            <hr />
                            <h1 className="card-title">Instrutores</h1>
                            <p className="card-text"></p>
                            <div className="d-grid gap-2">
                                <a href="/register" className="btn btn-primary btn-lg shadow">
                                Cadastrar Instrutor <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className="card">
                        <div className="card-body text-center">
                            <img src={student} className="card-img-top w-50" alt="..." />
                            <hr />
                            <h1 className="card-title">Alunos</h1>
                            <p className="card-text"></p>
                            <div className="d-grid gap-2">
                                <a href="/search" className="btn btn-success btn-lg shadow">
                                Buscar por Instrutores <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Cards;