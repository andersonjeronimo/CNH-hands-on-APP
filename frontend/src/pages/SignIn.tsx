import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import userModel from '../assets/utils/user-model.json';
import utils from '../assets/utils/utils.json';

function SignInPage() {

    const navigate = useNavigate();

    const [modelData, setModelData] = useState(userModel);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordFieldMessage, setPasswordFieldMessage] = useState("");

    useEffect(() => {
        //verificar se já existe um token, se sim, redirecionar para a página de detalhes
        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        const role = localStorage.getItem(`${import.meta.env.VITE_ROLE_VAR}`);
        if (token) {
            if (role) {                
                if (role === utils.role.instrutor) {
                    navigate('/profile');
                }
            }
        }
    }, []);

    const handleShowPassword = async (e: any) => {
        e.preventDefault();
        const { id } = e.target;
        if (id === 'form_password') {
            setShowPassword(!showPassword);
        }
    };

    const handleInputChange = async (e: any) => {
        const { name, value, type, checked } = e.target;
        setModelData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const url = `${import.meta.env.VITE_AUTH_API_URL}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modelData),
        });

        if (!response.ok) {
            //throw new Error(`Response status: ${_response.status}`);
            alert(`${response.status}`);
            setPasswordFieldMessage(`${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            localStorage.setItem(`${import.meta.env.VITE_TOKEN_VAR}`, data.token);
            localStorage.setItem(`${import.meta.env.VITE_ID_VAR}`, data.user._id);
            localStorage.setItem(`${import.meta.env.VITE_EMAIL_VAR}`, data.user.email);
            localStorage.setItem(`${import.meta.env.VITE_ROLE_VAR}`, data.user.role);

            //axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            window.location.reload();

            if (data.user.role === utils.role.instrutor) {
                navigate('/profile');
            }

        } else if (!data.success) {
            alert(`${data.message}`);
            navigate('/signup');
        }
    };

    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <p className="text-center">
                <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg> Login
                </h1>
            </p>
            <p className="text-center"><h3>Insira as credenciais</h3></p>
            <hr />
            <main className="form-signin">
                <form className='row g-3 needs-validation justify-content-md-center' onSubmit={handleSubmit}>
                    <div className='col-md-6'>

                        <div className='col-md-12'>
                            <label className='form-label'>Email</label>
                            <div className='input-group'>
                                <span className='input-group-text' id='email'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                                    </svg>

                                </span>
                                <input type='email' className='form-control form-control-lg' name='email' id='email'
                                    value={modelData.email} onChange={handleInputChange}
                                    aria-describedby='email' required />
                            </div>
                        </div>
                        <br />
                        <div className='col-md-12'>
                            <label className='form-label'>Senha</label>
                            <div className='input-group'>
                                <span className='input-group-text' id='form_password' onClick={handleShowPassword}>
                                    {
                                        showPassword ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                            </svg>
                                    }
                                </span>
                                <input type={showPassword ? 'text' : 'password'} className='form-control form-control-lg' name='password' id='password'
                                    value={modelData.password} onChange={handleInputChange}
                                    aria-describedby='passwordHelpBlock' required />
                            </div>
                            <div id="passwordHelpBlock" className="form-text">
                                <strong>{passwordFieldMessage}</strong>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className='col-md-12'>
                            <button className="btn btn-primary w-100 py-2 shadow" type="submit">
                                Efetuar Login <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                </svg>
                            </button>
                        </div>
                        <br />
                        <div className='col-md-12'>
                            <a className="icon-link icon-link-hover" href="/signup">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                                <p className="fs-5">Não tem cadastro? Clique aqui!</p>
                            </a>
                        </div>
                    </div>

                </form>

            </main>
        </div>
    )

}

export default SignInPage;