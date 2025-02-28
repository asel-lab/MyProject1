import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const WorkerEdit = ({usrItem, setUsrItem, setModalEdit_com, updateWorkers}) => {
    //const { empid } = useParams();

    //const [empdata, empdatachange] = useState ({});

    // useEffect(() => {
    //     fetch("http://localhost:8000/workers/" + itemId_com.id).then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         idchange(resp.id);
    //         namechange(resp.name);
    //         emailchange(resp.email);
    //         phonechange(resp.phone);
    //         edu_idchange(resp.edu_id);
    //         activechange(resp.isactive);

    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // }, [])

    
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [edu_id, edu_idchange] = useState([]);
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);
    const [edu, educhange] = useState([]);

    //idchange(usrItem.id);
    // namechange(prev => prev !== itemId_com.name ? itemId_com.name : prev);
    // emailchange(prev => prev !== itemId_com.email ? itemId_com.email : prev);
    // phonechange(prev => prev !== itemId_com.phone ? itemId_com.phone : prev);
    // edu_idchange(prev => prev !== itemId_com.edu_id ? itemId_com.edu_id : prev);
    // activechange(prev => prev !== itemId_com.isactive ? itemId_com.isactive : prev);

    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8000/education")
            .then((res) => res.json())
            .then((data) => educhange(data))
            .catch((err) => console.log(err));
    }, []);
    const handlesubmit = (e) => {
        e.preventDefault();
        // const empdata = { id, name, email, phone, active, edu_id };
        fetch("http://localhost:8000/workers/" + usrItem.id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(usrItem)
        }).then((res) => {
            alert('Saved saccessfully.')
            updateWorkers();
            setModalEdit_com(false);
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
                                <h1>Worker Edit</h1>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID </label>
                                            <input value={usrItem.id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label> Name </label>
                                           <input required value={usrItem.name} onMouseDown={e => valchange(true)} onChange={e => setUsrItem(({...usrItem, name: e.target.value}))} className="form-control"></input>
                                            {name.length == 0 && validation && <span className="text-danger" >Enter the Name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label> Email </label>
                                            <input value={usrItem.email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label> Phone </label>
                                            <input value={usrItem.phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    {/* Выбор образования */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Education</label>
                                            <select
                                                value={usrItem.edu_id}
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
                                            <input checked={usrItem.active} onChange={e => activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label className="form-check-label"> Is Active </label>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <button className="btn btn-danger" type="button" onClick={()=>setModalEdit_com(false) }>
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

export default WorkerEdit;