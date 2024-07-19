import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_CALL } from '../api';

const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        gender: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!data.firstName) errors.firstName = "First Name is required.";
        if (!data.lastName) errors.lastName = "Last Name is required.";
        if (!data.email) errors.email = "Email is required.";
        if (!data.password) errors.password = "Password is required.";
        if (data.password && data.password.length < 8) errors.password = "Password must be at least 8 characters.";
        if (!data.phone) errors.phone = "Phone is required.";
        if (!data.address) errors.address = "Address is required.";
        if (!data.gender) errors.gender = "Gender is required.";
        return errors;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const backend = await axios.post(`${API_CALL}/accounts/user/create`, data);
            if (backend.data.success === false) {
                alert("Email Already Exists \n Please Try with Another Email ...");
                setData({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    address: "",
                    password: "",
                    gender: ""
                });
            } else {
                localStorage.setItem("token", backend.data.token);
                navigate(`/accounts/profile/user/${backend.data.user._id}`);
            }
        } catch (error) {
            console.error("There was an error creating the user!", error);
        }
    };

    const valueHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card animated fadeInUp">
                        <div className="card-header">
                            <h3 className="text-center">Sign Up</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        value={data.firstName}
                                        className="form-control"
                                        name='firstName'
                                        id="firstName"
                                        onChange={valueHandler}
                                        placeholder="Enter your First name"
                                        required
                                    />
                                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        value={data.lastName}
                                        className="form-control"
                                        name='lastName'
                                        id="lastName"
                                        onChange={valueHandler}
                                        placeholder="Enter your Last name"
                                        required
                                    />
                                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        className="form-control"
                                        name='email'
                                        id="email"
                                        onChange={valueHandler}
                                        placeholder="Enter your email"
                                        required
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        name='password'
                                        className="form-control"
                                        id="password"
                                        onChange={valueHandler}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="number"
                                        value={data.phone}
                                        name='phone'
                                        className="form-control"
                                        id="phone"
                                        onChange={valueHandler}
                                        placeholder="Enter your phone"
                                        required
                                    />
                                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        className="form-control"
                                        name='address'
                                        id="address"
                                        onChange={valueHandler}
                                        placeholder="Enter your address"
                                        required
                                    />
                                    {errors.address && <small className="text-danger">{errors.address}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <input
                                        type="text"
                                        value={data.gender}
                                        className="form-control"
                                        name='gender'
                                        id="gender"
                                        onChange={valueHandler}
                                        placeholder="Enter your gender"
                                        required
                                    />
                                    {errors.gender && <small className="text-danger">{errors.gender}</small>}
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-dark btn-lg">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
