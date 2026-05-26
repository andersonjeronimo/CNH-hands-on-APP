import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import userModel from '../assets/utils/user-model.json';
import utils from '../assets/utils/utils.json';

function ResetPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(userModel);
    //const [userData, setUserData] = useState(userModel);
    const [passwordTest, setPasswordTest] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTest, setShowPasswordTest] = useState(false);
    const [passwordField1Message, setPasswordField1Message] = useState("");
    const [passwordField2Message, setPasswordField2Message] = useState("");
    //const [message, setMessage] = useState("");
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        //verificar se já existe um token, se sim, verificar se ainda está válido
        const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_VAR}`);
        if (token) {
            const user_id = localStorage.getItem(`${import.meta.env.VITE_ID_VAR}`);
            //checar sessão
            const url = `${import.meta.env.VITE_AUTH_API_SESSION_URL}`;
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: user_id }),
            }).then(async (response) => {
                const data = await response.json();
                if (data.status === 401) {
                    localStorage.removeItem(`${import.meta.env.VITE_TOKEN_VAR}`);
                    localStorage.removeItem(`${import.meta.env.VITE_ID_VAR}`);
                    localStorage.removeItem(`${import.meta.env.VITE_EMAIL_VAR}`);
                    localStorage.removeItem(`${import.meta.env.VITE_ROLE_VAR}`);
                    window.location.reload();

                } else if (data.status === 200) {
                    navigate('/profile');
                }
            });

        }

        //perfil selecionado na '/home' -->(deprecated)
        const profile = localStorage.getItem(`${import.meta.env.VITE_PROFILE_VAR}`);
        if (!profile) {
            setHasProfile(false);
        } else {
            setHasProfile(true);
            setFormData(prevState => ({
                ...prevState,
                ['role']: profile
            }));
        }


    }, []);

    const handlePwdInputChange = (e: any) => {
        const { value } = e.target;
        setPasswordTest(value);
    }

    const handleShowPassword = async () => {
        setShowPassword(!showPassword);
    };

    const handleShowPasswordTest = async () => {
        setShowPasswordTest(!showPasswordTest);
    };

    const handleInputChange = async (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const min = utils.passwordSize.min;
        const max = utils.passwordSize.max;
        //const passwdRegEx = new RegExp(`^[a-z | 0-9]{${min},${max}$`);
        //const passwdRegEx = /^[a-zA-Z | 0-9]{min,max}$/;        

        if (formData.password.length < min || formData.password.length > max) {
            setPasswordField1Message(`Atenção: Senhas informadas devem conter no mínimo ${min} caracteres e no máximo ${max} caracteres`);
            setFormData(prevState => ({
                ...prevState,
                ['password']: ''
            }));

        } else if (passwordTest.length < min || passwordTest.length > max) {
            setPasswordField2Message(`Atenção: Senhas informadas devem conter no mínimo ${min} caracteres e no máximo ${max} caracteres`);
            setPasswordTest('');

        } else if (formData.password !== passwordTest) {
            setPasswordField1Message(`Atenção: Senhas informadas devem ser iguais`);
            setPasswordField2Message(`Atenção: Senhas informadas devem ser iguais`);

            setFormData(prevState => ({
                ...prevState,
                ['password']: ''
            }));
            setPasswordTest('');

        } else {

            const api_url = `${import.meta.env.VITE_USER_API_URL}`;

            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 500) {
                alert(`Erro no servidor. Tente novamente mais tarde.`);
                setFormData(prevState => ({
                    ...prevState,
                    ['password']: '',
                    ['email']: '',
                }));
                setPasswordTest('');
            }

            const data = await response.json();

            if (data.status === 201) {
                //const userId = data.result;
                //navigate('/signup-result', { state: userId });
                const url = `${import.meta.env.VITE_AUTH_API_URL}`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    //throw new Error(`Response status: ${_response.status}`);
                    alert(`${response.status}: Erro no servidor.`);
                    setPasswordField1Message(`${response.status}`);
                    setPasswordField2Message(`${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    localStorage.setItem(`${import.meta.env.VITE_TOKEN_VAR}`, data.token);
                    localStorage.setItem(`${import.meta.env.VITE_ID_VAR}`, data.user._id);
                    localStorage.setItem(`${import.meta.env.VITE_EMAIL_VAR}`, data.user.email);
                    localStorage.setItem(`${import.meta.env.VITE_ROLE_VAR}`, data.user.role);

                    window.location.reload();

                    if (data.user.role === utils.role.instrutor) {
                        navigate('/register');
                    }

                }


            } else if (data.status === 409) {
                if (typeof data === 'object' && Object.keys(data).length > 0) {
                    alert(`Erro ${data.status}: ${data.message}`);
                    setPasswordField1Message(`${data.status} : ${data.message}`);
                    setPasswordField2Message(`${data.status} : ${data.message}`);
                }
                setFormData(prevState => ({
                    ...prevState,
                    ['password']: '',
                    ['email']: '',
                }));
                setPasswordTest('');
            }
        }
    };



    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <p className="text-center">
                <h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-lock" viewBox="0 0 16 16">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                    </svg> Senha do Usuário
                </h1>
            </p>
            <p className="text-center"><h3>Insira a nova senha</h3></p>
            <hr />
            <main className="form-signin">
                <form className='needs-validation' onSubmit={handleSubmit}>
                    <div className='row g-3 justify-content-md-center'>

                        <div className='col-md-6'>
                            <label className='form-label'>Nova senha</label>
                            <div className='input-group mb-3'>
                                {
                                    showPassword ?
                                        (<>
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleShowPassword}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                </svg>
                                            </button>
                                        </>)
                                        :
                                        (<>
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleShowPassword}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                                </svg>
                                            </button>
                                        </>)
                                }
                                <input type={showPassword ? 'text' : 'password'} className='form-control form-control-lg' name='password' id='password'
                                    value={formData.password} onChange={handleInputChange}
                                    aria-describedby='passwordHelpBlock' required />
                            </div>
                            <div id="passwordHelpBlock" className="form-text">
                                <strong>{passwordField1Message}</strong>
                            </div>
                        </div>

                        <br />

                        <div className='col-md-6'>
                            <label className='form-label'>Repetir nova senha</label>
                            <div className='input-group mb-3'>
                                {
                                    showPasswordTest ?
                                        (<>
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleShowPasswordTest}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                </svg>
                                            </button>
                                        </>)
                                        :
                                        (<>
                                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleShowPasswordTest}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                                </svg>
                                            </button>
                                        </>)
                                }
                                <input type={showPasswordTest ? 'text' : 'password'} className='form-control form-control-lg' name='passwordTest' id='passwordTest'
                                    value={passwordTest} onChange={handlePwdInputChange}
                                    aria-describedby='passwordHelpBlock' required />
                            </div>
                            <div id="passwordHelpBlock" className="form-text">
                                <strong>{passwordField2Message}</strong>
                            </div>
                        </div>

                        <br />

                        <div className='col-md-6'>
                            <button className="btn btn-success w-100 py-2 shadow" type="submit">
                                Atualizar Senha <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-lock" viewBox="0 0 16 16">
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                                </svg>
                            </button>
                        </div>

                        <br />                        

                    </div>
                </form>
            </main>
        </div>
    )

}

export default ResetPage;