import React from 'react';
import "./css/navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <>
            <nav>
                <div className="container">
                    <ul className="container1">
                        <li className="schrift">
                            <Link to="/" className="schrift">Home</Link>
                        </li>

                        <li className="schrift">
                            <Link to="/keyboard" className="schrift">Keyboard</Link>
                        </li>

                        <li className="schrift">
                            <Link to="/ueberuns" className="schrift">Über uns</Link>
                        </li>

                        <li className="schrift">
                            <Link to="/login" className="schrift">Login</Link>
                        </li>

                        <li className="schrift">
                            <Link to="/leaderboard" className="schrift">Leaderboard</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;