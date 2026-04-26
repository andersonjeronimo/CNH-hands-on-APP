import { useEffect } from 'react';
declare var $: any;

import Cards from "./partials/Cards";
import Logo from "./partials/Logo";
import Explanation from "./partials/Explanation";
import LogoutModal from './partials/LogoutModal';

function LandPage() {

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
                body: JSON.stringify({ id: user_id })
            }).then(async (response) => {
                const data = await response.json();
                if (!data.success) {
                    $('#logoutModal').modal('show');                    
                }
            });

        }

    }, []);

    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <Logo></Logo>
            <LogoutModal></LogoutModal>
            <hr />
            <Cards></Cards>
            <br />
            <Explanation></Explanation>
        </div>

    )
}

export default LandPage;