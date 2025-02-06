import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const WorkerDetails = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/workers/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div>
            <div className="card" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Employee Create</h2>
                </div>
                <div className="card-body"></div>
                {empdata &&
                    <div>
                        <h1> The Employee name is: {empdata.name} ({empdata.id})</h1>
                        <h3>Contact Details</h3>
                        <h5>Email is: {empdata.email}</h5>
                        <h5>Phone is: {empdata.phone}</h5>
                        <Link className="btn btn-danger" to="/workers">Back to Listing</Link>
                    </div>
                }
            </div>
        </div>

    );
}

export default WorkerDetails;