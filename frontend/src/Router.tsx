import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import JSX from 'react';

import App from './App';
import LoginPage from './pages/Login';
import RegisterForm from './pages/RegisterForm';
import RegisterResult from './pages/RegisterResult';
import SearchForm from './pages/SearchForm';
import SearchResult from './pages/SearchResult';
import Customers from './pages/Instructors';
import CustomerDetails from './pages/InstructorDetails';
import Details from './pages/Details';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FaqCustomers from './pages/FaqCustomers';
import FaqInstructors from './pages/FaqInstructors';


import Construction from './pages/partials/Construction';

function Router() {

    type Props = {
        children: JSX.ReactElement;
    }

    //implementar login
    function PrivateRoute({ children }: Props) {
        const isAuth = false;
        return isAuth ? children : <Navigate to="/" />

    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<App />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/construction' element={<Construction />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/register-result' element={<RegisterResult />} />
                <Route path='/search' element={<SearchForm />} />
                <Route path='/search-result' element={<SearchResult />} />
                
                {/* rota de listagem de instrutores deve ser privada */}
                <Route path='/customers' element={
                    <PrivateRoute>
                        <Customers />
                    </PrivateRoute>
                } />
                
                <Route path='/customersfilter' element={<CustomerDetails />}></Route>
                <Route path='/details' element={<Details />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/privacy' element={<Privacy />}></Route>
                <Route path='/terms' element={<Terms />}></Route>
                <Route path='/faq-customers' element={<FaqCustomers />}></Route>
                <Route path='/faq-instructors' element={<FaqInstructors />}></Route>
                
            </Routes>
        </BrowserRouter>
    )

}

export default Router;