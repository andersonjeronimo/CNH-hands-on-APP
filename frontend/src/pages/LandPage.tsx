import Cards from "./partials/Cards";
import Logo from "./partials/Logo";
import Explanation from "./partials/Explanation";

function LandPage() {
    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">            
            <Logo></Logo>
            <hr />
            <Cards></Cards>
            <br />           
            <Explanation></Explanation>
        </div>

    )
}

export default LandPage;