import Cards from "./partials/Cards";
import Logo from "./partials/Logo";

function LandPage() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <Logo></Logo>            
            <hr />
            <Cards></Cards>
        </div>

    )
}

export default LandPage;