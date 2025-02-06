import React from "react";

import 'D:/react/project1/node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyModal from "../UI/MyModal/MyModal";
import WorkerCreate from "./WorkerCreate";

const WorkersList=()=>{
    const [empdata, empdatachange] = useState(null);
    const [modal,setModal]=useState(false);
    const navigate = useNavigate();

    const closeModal = () => {
        setModal(false); // Закрывает окно
      };

    const LoadDetail = (id) => {
        navigate("/workers/detail/" + id);
    }

    const LoadEdit = (id) => {
        navigate("/workers/edit/" + id);
    }

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

    const fetchWorkers = () =>{
        fetch("http://localhost:8000/workers").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
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
                        <button className="btn btn-success" onClick={()=> setModal(true)}>Add New (+)</button>
                        <MyModal visible={modal} setVisible={setModal}><WorkerCreate onClose={closeModal} updateWorkers={fetchWorkers}/></MyModal>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark">
                            <tr>
                                <th className="bg-dark text-white"> ID </th>
                                <th className="bg-dark text-white"> Name </th>
                                <th className="bg-dark text-white"> Email </th>
                                <th className="bg-dark text-white"> Phone </th>
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
                                        <td>
                                            <a onClick={() => { LoadEdit(item.id) }} className='btn btn-success'>  Edit   </a>
                                            <a onClick={() => { Removefunction(item.id) }} className='btn btn-danger'>Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className='btn btn-primary'>Details</a>
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


 

