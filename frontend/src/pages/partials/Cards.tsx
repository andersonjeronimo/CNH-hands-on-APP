import driver from '../../assets/images/driver.png';
import student from '../../assets/images/student.png';
//import driver from '../../assets/images/instrutor.svg';
//import student from '../../assets/images/alunos.svg';

function Cards() {    

    return (

        <div className="container mt-lg-5 mb-lg-5">
            <div className='row'>
                <div className='col-md-6'>
                    <div className="card" >
                        <div className="card-body text-center">
                            <img src={driver} className="card-img-top w-50" alt="..." />
                            <hr />
                            <h1 className="card-title">Instrutor</h1>
                            <p className="card-text fs-5">Gerencie os dados de sua conta aqui</p>
                            <div className="d-grid gap-2">
                                <a href="/details" className="btn btn-primary btn-lg shadow">
                                    Sou Instrutor <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
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
                            <h1 className="card-title">Aluno</h1>
                            <p className="card-text fs-5">Busque os instrutores mais próximos aqui</p>
                            <div className="d-grid gap-2">
                                <a href="/search" className="btn btn-success btn-lg shadow">
                                    Sou Aluno <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
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