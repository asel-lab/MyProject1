import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import MyModal from "../UI/MyModal/MyModal";
const WorkerCreate = ({ setModalAdd_com, updateWorkers }) => {
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [edu_id, edu_idchange] = useState([]);
    const [edu, educhange] = useState([]);
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/education")
            .then((res) => res.json())
            .then((data) => educhange(data))
            .catch((err) => console.log(err));
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { name, email, phone, active, edu_id};
        fetch("http://localhost:8000/workers", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert('Saved saccessfully.');
            updateWorkers();
            setModalAdd_com(false);

        }).catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h1>Worker Create </h1>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID </label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label> Name </label>
                                            <input required value={name} onMouseDown={e => valchange(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                            {name.length == 0 && validation && <span className="text-danger" >Enter the Name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label> Email </label>
                                            <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label> Phone </label>
                                            <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    {/* Выбор образования */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Education</label>
                                            <select
                                                value={edu_id}
                                                onChange={(e) => edu_idchange(e.target.value)}
                                                className="form-control"
                                            >
                                                <option value="">Select an Education</option>
                                                {edu.map((dept) => (
                                                    <option key={dept.id} value={dept.id}>
                                                        {dept.name_edu}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input checked={active} onChange={e => activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label className="form-check-label"> Is Active </label>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success " type="submit">Save</button>
                                            <button className="btn btn-danger" type="button" onClick={() => setModalAdd_com(false) }>
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WorkerCreate;