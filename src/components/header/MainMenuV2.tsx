/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

interface DataType {
    toggleSubMenu2?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    closeInfoBar?: () => void;
}

const MainMenuV2 = ({ toggleSubMenu2, closeInfoBar }: DataType) => {
    return (
        <>
            <ul className="simple-menu-list">
               
                   
                <li><Link to="/" onClick={closeInfoBar}>Home Main</Link></li>

                
                <li><Link to="/services" onClick={closeInfoBar}>Services </Link></li>
                <li><Link to="/portfolio" onClick={closeInfoBar}>Portfolio</Link> </li>
                <li><Link to="/contact-us" onClick={closeInfoBar}>Contact</Link></li>
            </ul>
        </>
    );
};

export default MainMenuV2;