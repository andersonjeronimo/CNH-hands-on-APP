import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import userModel from '../assets/utils/user-model.json';
import utils from '../assets/utils/utils.json';
import PinImg from '../assets/images/cnh-pin.svg';


function SignInPage() {

    const navigate = useNavigate();

    userModel.role = utils.role.instrutor;

    const [formData, setFormData] = useState(userModel);
    //const [userData, setUserData] = useState(userModel);
    const [passwordTest, setPasswordTest] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTest, setShowPasswordTest] = useState(false);
    const [passwordFieldMessage, setPasswordFieldMessage] = useState("Mensagem");
    const [message, setMessage] = useState("");

    const handlePwdInputChange = (e: any) => {
        const { value } = e.target;
        setPasswordTest(value);
    }

    const handleShowPassword = async (e: any) => {
        e.preventDefault();
        const { id } = e.target;
        if (id === 'form_password') {
            setShowPassword(!showPassword);
        }
        if (id === 'form_password_test') {
            setShowPasswordTest(!showPasswordTest);
        }
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

        if (formData.password !== passwordTest) {
            setPasswordFieldMessage(`Atenção: Senhas informadas devem ser iguais`);

            setFormData(prevState => ({
                ...prevState,
                ['password']: ''
            }));

            setPasswordTest('');

        } else {
            axios.post(`${import.meta.env.VITE_USER_API_URL}`, formData)
                .then((response) => {
                    if (response.data) {
                        //if (response.status === 201) {                            
                        //   setMessage(typeof response.data);
                        //}                        
                        const userId = response.data;

                        //ATENÇÃO!! Enviar para tela de cadastro realizado com sucesso e efetuar login
                        //https://www.youtube.com/watch?v=r4gjCn2r-iw

                        navigate('/signup-result', { state: userId });
                        //axios.get(`${import.meta.env.VITE_INSTRUCTOR_API_USER_ID_URL}/${userId}`)
                        //    .then((response) => {
                        //        if (response.data) {
                        //
                        //            if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                        //                //setMessage(typeof response.data);
                        //                navigate('/details', { state: response.data });
                        //            }
                        //
                        //        } else {
                        //            navigate('/register', { state: userId });
                        //        }
                        //    })

                    } else {
                        //
                        setMessage(typeof response.data);
                    }

                })
                .catch((error) => {
                    setMessage(`${error.message}, (Já existe um usuário cadastrado com este e-mail.)`);
                    alert(`${error.message}, (Já existe um usuário cadastrado com este e-mail.)`);
                    setFormData(prevState => ({
                        ...prevState,
                        ['password']: '',
                        ['email']: '',
                    }));
                    setPasswordTest('');
                });


            /* if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
                //setMessage('Data is a non-empty object.');
                setMessage(response.data);

                if (response.data.role === utils.role.aluno) {
                    navigate('/search', { state: response.data });

                } else if (response.data.role === utils.role.instrutor) {
                    //buscar o instructor pelo 'userId'

                    //se não existir
                    if (false) {
                        //passar o ID e completar o cadastro
                        navigate('/register', { state: response.data });
                    }
                    //se existir, ir para página de perfil
                    navigate('/details', { state: response.data });
                    

                } else {
                    setMessage(response.data.message);
                }

            }
        } else {
            setMessage(response.data.message);
        } */



        }
    };



    return (
        <div className="container mt-lg-5 mb-lg-5">
            <div className='mx-auto d-block text-center'>
                <img
                    className="mb-4"
                    src={PinImg}
                    alt=""
                    width="72"
                    height="57"
                />
            </div>
            <p className="text-center"><h1>Cadastro</h1></p>
            <p className="text-center"><h3>Registre as credenciais</h3></p>
            <p><h2>{message}</h2></p>
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
                                    value={formData.email} onChange={handleInputChange}
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
                                    value={formData.password} onChange={handleInputChange}
                                    aria-describedby='passwordHelpBlock' required />
                            </div>
                            <div id="passwordHelpBlock" className="form-text">
                                <strong>{passwordFieldMessage}</strong>
                            </div>
                        </div>
                        <br />
                        <div className='col-md-12'>
                            <label className='form-label'>Repetir Senha</label>
                            <div className='input-group'>
                                <span className='input-group-text' id='form_password_test' onClick={handleShowPassword}>
                                    {
                                        showPasswordTest ?
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
                                <input type={showPasswordTest ? 'text' : 'password'} className='form-control form-control-lg' name='password_test' id='password_test'
                                    value={passwordTest} onChange={handlePwdInputChange}
                                    aria-describedby='passwordHelpBlock' required />
                            </div>
                            <div id="passwordHelpBlock" className="form-text">
                                <strong>{passwordFieldMessage}</strong>
                            </div>
                        </div>

                        <br />

                        <div className='col-md-12'>
                            <label className='form-label'>Perfil</label>

                            <div className='input-group'>
                                <span className='input-group-text' id='role'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                    </svg>
                                </span>
                                <select name='role' id='role' className='form-select form-select-lg' value={formData.role} onChange={handleInputChange} required>
                                    <option selected value={utils.role.instrutor}>
                                        {utils.role.instrutor}
                                    </option>
                                    <option selected value={utils.role.aluno}>
                                        {utils.role.aluno}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <br />
                        <hr />
                        <br />

                        <div className='col-md-12'>
                            <button className="btn btn-success w-100 py-2 shadow" type="submit">
                                Cadastrar Usuário <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                                </svg>
                            </button>
                        </div>
                        <br />
                        <div className='col-md-12'>
                            <a className="icon-link icon-link-hover link-success" href="/signin">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                                <p className="fs-5">Já tem cadastro? Clique aqui!</p>
                            </a>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )

}

export default SignInPage;