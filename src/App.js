import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Sp_Edu from "./components/Sp_Edu";
import { Layout } from "./components/Layout";
import WorkerCreate from "./components/workers/WorkerCreate";
import WorkerDetails from "./components/workers/WorkerDetails";
import WorkerEdit from "./components/workers/WorkerEdit";
import WorkersList from "./components/workers/WorkersList";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/edu" element={<Sp_Edu />} />
          <Route path="/about" element={<About />} />
          <Route path='/workers' element={<WorkersList />}/>
          <Route path='/workers/create' element={<WorkerCreate />} />
          <Route path='/workers/detail/:empid' element={<WorkerDetails />} />
          <Route path='/workers/edit/:empid' element={<WorkerEdit />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
