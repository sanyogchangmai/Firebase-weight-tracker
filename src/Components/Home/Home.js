import "./Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { firebase } from "../../firebase";
import { useAuth } from "../../Context/Context";

const Home = () => {

    console.log(process.env.REACT_APP_FIREBASE_API_KEY);

    const [data,setData] = useState("");
    const [loading,setLoading] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        setLoading(true);
        const db = firebase.firestore();
        db.collection("weights").where("user_uid","==",currentUser.uid).get()
        .then(function(snapshot){
            setData(snapshot);
            setLoading(false);
        })
      },[])

    function handleDelete(id){
        const db = firebase.firestore();
        db.collection("weights").doc(id).delete();
        window.location.reload();
    }

    return (

        <div className="home">

            <center>

            <div className="row">

                <center>
                    <h1 className="mt-5 mb-3 alert-primary py-3">All past records.</h1>
                </center>

                <center>
                { loading && 
                <div className="spinner-border text-primary mt-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                </center>

            { data && 

            <>
            { data.docs.map( result => (
            <div className="card mx-5 alert-primary"key={result.id}>
                <div className="card-body">
                    <center>
                    <h1 className="card-title mt-4">{ result.data().weight } 
                    <span className="unit">kg</span>
                    </h1>
                    </center>
                    
                    <h5 className="card-text pt-3">{ result.data().time.toDate().toString().substring(0,15) }</h5>
                    <h5 className="card-text pt-3">{ result.data().time.toDate().toString().substring(16,21) } IST</h5>
                    
                    <div className="dropdown">
                        <i className="fas fa-ellipsis-v" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link className="dropdown-item" to={`/edit/${ result.id }`}>Edit</Link></li>
                            <li className="dropdown-item" onClick={ () => handleDelete(result.id) }>Delete</li>
                        </ul>
                    </div>

               </div>
            </div>))}
           </>}

            </div>

            </center>

        </div>

    );
}
 
export default Home;