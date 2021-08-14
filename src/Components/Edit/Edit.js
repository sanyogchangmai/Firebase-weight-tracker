import "./Edit.css";
import { useParams, useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import { firebase } from "../../firebase";

const Edit = () => {

    const { id } = useParams();
    const [data, setData] = useState("");
    const [weight, setWeight] = useState("");
    const history = useHistory();

    useEffect(() => {
        const db = firebase.firestore();
        db.collection("weights").doc(id).get()
        .then(function(snapshot){
            setData(snapshot.data());
            setWeight(snapshot.data().weight);
        })
      },[id])

      function handleUpdate(e){
          e.preventDefault();

          const db = firebase.firestore();
          db.collection("weights").doc(id).update({
              weight: weight
          })
          .then(function(){
            alert("Updated successfully");
            history.push("/");
          })
      }

    return (

        <div className="edit">
            <center>
                { data &&
                <form onSubmit={ handleUpdate }>
                    <h2 className="text-primary mb-4">Edit your entry</h2>

                    <div className="mb-3">
                    <input type="number" 
                    defaultValue={ data.weight }
                    onChange={ (e) => setWeight(e.target.value) } 
                    className="form-control weight" 
                    name="weight" 
                    placeholder="Enter weight"/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-login mb-3">Update</button>

                </form>}
            </center>
        </div>

    );
}
 
export default Edit;