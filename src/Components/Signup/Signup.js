import "./Signup.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../../Context/Context";
import { useHistory } from "react-router-dom";


const Signup = () => {

  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
      alert("Account created successfully");
      history.push("/");
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

    return (

        <div className="signup">

         <center>

         {error && 
         <div className="alert alert-danger" role="alert">
         {error}
         </div>
         }

         { loading && 
         <div className="spinner-border text-primary" role="status">
            <span classname="visually-hidden">Loading...</span>
          </div>}
                    
          <form onSubmit={ handleSubmit }>
          <h2 className="text-primary mb-4">Create an account.</h2>

          <div className="mb-3">
            <input
              type="email"
              ref={ emailRef }
              className="form-control email"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              ref={ passwordRef }
              className="form-control password"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              ref={ passwordConfirmRef }
              className="form-control password"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-signup mb-3"
          >
            Create account
          </button>

          <br />

          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
            </center>

        </div>

    );
}
 
export default Signup;