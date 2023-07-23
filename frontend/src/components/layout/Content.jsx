import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../../Views/Login";
import Register from "../../Views/Register";
import AllEvents from "../../Views/AllEvents";
import MyEventsView from "../../Views/MyEvents";
import CreateEvent from "../../Views/CreateEvent";


const Content = (props) => {
    return (
        <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/all-events" exact element={<AllEvents />} />
            <Route path="/my-events" exact element={<MyEventsView />} />
            <Route path="/create-event" exact element={<CreateEvent />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default Content;