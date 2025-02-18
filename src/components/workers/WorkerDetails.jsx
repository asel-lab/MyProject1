import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const WorkerDetails = ({ empdata, setModalDetail_com}) => {
    //const [empdata, empdatachange] = useState({});
    const [edu, educhange] = useState([]);
    // useEffect(() => {
    //     fetch("http://localhost:8000/workers/" + itemId_com).then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         empdatachange(resp);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // }, [])

    useEffect(() => {
        fetch("http://localhost:8000/education")
            .then((res) => res.json())
            .then((data) => educhange(data))
            .catch((err) => console.log(err));
    }, []);


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
                        <h5>Phone is: {empdata.edu_id}</h5>
                        {/* Выбор образования */}
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>Education</label>
                                <select
                                    value={empdata.edu_id}
                                
                                >
                                    {edu.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name_edu}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-danger" type="button" onClick={() => setModalDetail_com(false)}>
                            Back
                        </button>
                    </div>
                }
            </div>
        </div>

    );
}

export default WorkerDetails;