import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Context/Context";
import { useState } from 'react';

const Navbar = () => {

    const [error, setError] = useState("");
    const history = useHistory();
    const {logout} = useAuth();

    async function handleLogout() {
        setError("");
    
        try {
          await logout();
          history.push("/login");
        } catch {
          setError("Failed to log out");
        }
      }


    return (

        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TrackWeight</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link me-3" to="/entry">Record</Link>
                    <Link to="/signup">
                        <button type="button" onClick={ handleLogout } className="btn btn-danger ml-auto logout-btn">Logout</button>
                    </Link>
                </div>
                </div>
            </div>
            </nav>


            { error && 
            <div className="alert alert-danger mt-4 mb-3" role="alert">
                <center>
                { error }
                </center>
            </div>
            }

        </div>

    );
}
 
export default Navbar;