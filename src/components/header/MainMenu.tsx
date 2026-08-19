/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import banner1 from "/assets/img/banner/1.jpg";
import ModalVideo from "react-modal-video";
import { useState } from "react";

interface DataType {
    navbarPlacement?: string;
    toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MainMenu = ({ navbarPlacement, toggleSubMenu }: DataType) => {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement ? navbarPlacement : ""}`} data-in="fadeInDown" data-out="fadeOutUp">
              <li><Link to="/">Home </Link></li>
               
                <li><Link to="/services">Services</Link></li>
                 <li><Link to="/portfolio">portfolio</Link></li>

                <li><Link to="/contact-us">contact</Link></li>
            </ul>

            <ModalVideo channel='youtube' isOpen={isOpen} videoId="35mvh-2oII8" onClose={() => setOpen(false)} />
        </>
    );
};

export default MainMenu;