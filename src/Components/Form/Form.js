import "./Form.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { firebase } from "../../firebase";
import { useAuth } from "../../Context/Context";

const Form = () => {

    const { currentUser } = useAuth();
    const [presentWeight, setPresentWeight] = useState("");
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();

        const db = firebase.firestore();
        db.collection("weights").add({
            user_uid: currentUser.uid,
            weight: presentWeight,
            time: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then(function(){
            alert("Data saved successfully");
        history.push("/");
        })   
    }


    return (

        <div className="form">
            <center>
                <form onSubmit={ handleSubmit }>
                    <h2 className="text-primary mb-4">Enter your weight</h2>

                    <div className="mb-3">
                    <input type="number" 
                    value={ presentWeight } 
                    onChange={ (e) => { setPresentWeight(e.target.value)} } 
                    className="form-control weight" 
                    name="weight" 
                    placeholder="Enter weight"
                    required/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-submit mb-3">Submit</button>

                </form>
            </center>
        </div>

    );
}
 
export default Form;