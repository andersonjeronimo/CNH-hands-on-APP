import PinImg from '../assets/images/cnh-pin.svg';

function LoginPage() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <p className="text-center"><h1>Login</h1></p>
            <hr />
            <main className="form-signin w-100 m-auto">
                <form>
                    <div className='mx-auto d-block text-center'>
                        <img
                            className="mb-4"
                            src={PinImg}
                            alt=""
                            width="72"
                            height="57"
                        />
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    </div>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                        />
                        <label>Email address</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                        />
                        <label>Password</label>
                    </div>
                    <div className="form-check text-start my-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="remember-me"
                            id="checkDefault"
                        />
                        <label className="form-check-label">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Sign in
                    </button>
                </form>
            </main>
        </div>
    )

}

export default LoginPage;