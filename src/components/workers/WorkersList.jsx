import React from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyModal from "../UI/MyModal/MyModal";
import WorkerCreate from "./WorkerCreate";
import WorkerEdit from "./WorkerEdit";
import WorkerDetails from "./WorkerDetails";

const WorkersList = () => {
    const [empdata, empdatachange] = useState([]);
    const [edudata, edudatachange] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);

    const Removefunction = (id) => {
        if (window.confirm('Do you you want to remove?')) {
            fetch("http://localhost:8000/workers/" + id, {
                method: "DELETE",
            }).then((res) => {
                alert('Removed saccessfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }



    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = () => {
        fetch("http://localhost:8000/workers").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })

        fetch("http://localhost:8000/education").then((res) => {
            return res.json();
        }).then((resp) => {
            edudatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })

    };
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2> Workers Listing</h2>
                </div>
                <div className="card-body">
                    <div className='divbtn'>
                        <button className="btn btn-success" onClick={() => setModalAdd(true)}>Add New (+)</button>
                        <MyModal visible={modalAdd}>
                            <WorkerCreate setModalAdd_com={setModalAdd} updateWorkers={fetchWorkers} />
                        </MyModal>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark">
                            <tr>
                                <th className="bg-dark text-white"> ID </th>
                                <th className="bg-dark text-white"> Name </th>
                                <th className="bg-dark text-white"> Email </th>
                                <th className="bg-dark text-white"> Phone </th>
                                <th className="bg-dark text-white"> Education</th>
                                <th className="bg-dark text-white"> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>    <select
                                            value={item.edu_id}
                                            onChange={(e) => empdatachange(e.target.value)}
                                        >
                                            {edudata.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name_edu}
                                                </option>
                                            ))}
                                        </select>
                                        </td>

                                        <td>

                                            <button className="btn btn-success" onClick={() => setModalEdit(true)}>Edit</button>
                                            <MyModal visible={modalEdit}>
                                                <WorkerEdit setModalEdit_com={setModalEdit} updateWorkers={fetchWorkers} itemId_com={item.id} />
                                            </MyModal>

                                            <button className='btn btn-primary' onClick={() => setModalDetail(true)}>Detail</button>
                                            <MyModal visible={modalDetail}>
                                                <WorkerDetails setModalDetail_com={setModalDetail} itemId_com={item.id} />
                                            </MyModal>

                                            <a onClick={() => { Removefunction(item.id) }} className='btn btn-danger'>Remove</a>

                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    );
};

export default WorkersList;




