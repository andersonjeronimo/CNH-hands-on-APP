import Cards from "./partials/Cards";
import Logo from "./partials/Logo";
import Explanation from "./partials/Explanation";

function LandPage() {
    return (
        <div className="container container-fluid mt-lg-5 mb-lg-5">
            <Cards></Cards>            
            <Explanation></Explanation>
            <hr />
            <Logo></Logo>
        </div>

    )
}

export default LandPage;