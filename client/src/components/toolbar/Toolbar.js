import React, { useState, useContext} from 'react';
import './styles.css'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faMagnifyingGlass, faBars, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import mainContext from "../../context/mainContext";

const Toolbar = () => {

    const {user, setUser, setAuthOption} = useContext(mainContext);
    const nav = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);

    async function logOut() {
        setUser(null)
        setAuthOption('')
        nav('/')
    }

    return (
        <div>
            {/*desktop*/}
            <div className="py-1 toolbar-desktop">
                <div className="toolbar d-flex justify-content-between align-items-center">
                    <div className="d-flex p-2 text-white align-items-center">
                        <Link to="/your-movies">Your movies</Link>
                        <Link to="/vilija-recommends">Recommends</Link>
                        <Link to="/search"><FontAwesomeIcon icon={faMagnifyingGlass} className="my-1 fs-4 pointer" /></Link>
                    </div>
                    <div className="d-flex p-2 text-white align-items-center">
                        <div>{user}</div>
                        <div className='ms-2 cursor' onClick={logOut}><FontAwesomeIcon icon={faRightFromBracket} className="my-1 fs-4"/></div>
                    </div>
                </div>
            </div>


            {/*mobile*/}
            <div className="py-1 toolbar-mobile">
                <div className='toolbar'>
                    <div className="w-100 d-flex justify-content-between align-items-center p-2 text-white ">
                        <div><FontAwesomeIcon icon={faUserAstronaut} className='fs-2'/> {user}</div>
                        <FontAwesomeIcon icon={faBars} className="m-1 fs-2 cursor" onClick={() => setToggleMenu(!toggleMenu)} />
                    </div>
                    <div>
                        {toggleMenu &&
                        <div className="bg-mobile w-100 d-flex flex-column align-items-end p-2 text-white border-top border-danger
                    position-absolute position-absolute__menu"
                        >
                            <Link to="/search">Search movie</Link>
                            <Link to="/your-movies">Your movies</Link>
                            <Link to="/vilija-recommends">Recommended movies</Link>
                            <div className='text-danger logout' onClick={logOut}>Logout</div>
                        </div>
                        }
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Toolbar;