function LogoutModal() {

    const handleClick = () => {
        localStorage.removeItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        localStorage.removeItem(`${import.meta.env.VITE_ID_VAR}`);
        localStorage.removeItem(`${import.meta.env.VITE_EMAIL_VAR}`);
        localStorage.removeItem(`${import.meta.env.VITE_ROLE_VAR}`);
        window.location.reload();
    }

    return (
        <div className="modal fade" id="logoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="logoutModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="logoutModalLabel">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-hourglass-bottom" viewBox="0 0 16 16">
                                <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z" />
                            </svg> Sessão expirou</h1>                        
                    </div>
                    <div className="modal-body">

                        <div className="text-center">
                            <div className="alert alert-danger" role="alert">
                                Sua sessão expirou. Por favor, faça login novamente para continuar usando o aplicativo.
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleClick} className="btn btn-danger" data-bs-dismiss="modal">
                            Sair do aplicativo <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LogoutModal;