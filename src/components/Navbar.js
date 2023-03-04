import { React, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Navbar = (props) => {
    const navigate = useNavigate();
    let location = useLocation();
    const Logout = () => {
        props.ShowAlerts("Logged out", "warning")
        localStorage.removeItem('token')
        navigate('/Login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        i<span color='yellow'>
                            Notebooks
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/aboutus' ? "active" : ""} `} to="/aboutus">About</Link>
                            </li>

                        </ul>
                        {!(localStorage.getItem('token')) ?
                            <form className="d-flex">

                                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link >
                                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>

                            </form> : <button onClick={Logout} className="btn btn-primary mx-1">LoGout </button>
                        }
                    </div>

                </div>
            </nav >
        </div >
    )
}

export default Navbar