import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../Views/Login";
import Register from "../../Views/Register";
import HomeView from "../../Views/Home";


const Content = (props) => {
    return (
        <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/home" exact element={<HomeView />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default Content;