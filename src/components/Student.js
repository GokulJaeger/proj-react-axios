import React from 'react';
import {
    useEffect,
    useState,
} from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Student.css'

export default function Student() {


    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const [cities, setCities] = useState([]);
    const [Details, setDetails] = useState([]);

    const validationSchema = Yup.object({
        firstname: Yup.string().required("*Firstname is mandatory"),
        lastname: Yup.string().required("*Lastname is mandatory"),
        email: Yup.string().email("INvalid Email").required("Pls Enter valid Email"),
        age: Yup.number().typeError("Enter a valid age").min(20, " Minimum Age is 20").max(90, "Max age is 90"),
        phonenumber: Yup.string().matches(phoneRegExp, "*Phone number is invalid"),
        college: Yup.string().required("*College name is mandatory"),
        city: Yup.string().required("Please select city"),
        department: Yup.string().required("*Department name is required")
    })
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            age: 0,
            email: '',
            phonenumber: '',
            city: ''
        },
        validationSchema,
        onSubmit(values) {
            console.log("=============Submitted");
            console.log(values);

            const reqOptios = {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            };

            fetch("http://localhost:8000/studs", reqOptios).then(res => res.json()).then(data => {
                console.log("saved json data...");
                console.log(data.id);
                setDetails(data.id);
            })
        }
    })
    useEffect(() => {
        console.log("Executed after render method=======");
        fetch("http://localhost:8000/city").then(res => res.json()).then(data => {
            console.log(data);
            setCities(data);
        }).catch(e => {
            console.error("ERR in CITIES...");
            console.error(e);
        }).finally(() => {
            console.log("I am in finally");
        })
    }, [])




    return (
        <div>
            <div className="card-container">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-header">STUDENT DETAILS</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <h5>First Name: </h5>
                                        <input placeholder="Enter your First Name" name="firstname" onChange={handleChange} values={values.firstname} />
                                        <h3> {errors.firstname}</h3>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="col-sm-4 form-group">
                                        <h5>Last Name: </h5>
                                        <input placeholder="Enter your Last Name" name="lastname" onChange={handleChange} values={values.lastname} />
                                        <h3>{errors.lastname}</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <h5>Age: </h5>
                                        <input placeholder="Enter your Age" name="age" onChange={handleChange} values={values.age} />
                                        <h3>{errors.age}</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <h5>Email Id: </h5>
                                        <input placeholder="Enter your Email Id" name="email" onChange={handleChange} values={values.email} />
                                        <h3>{errors.email} </h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <h5>College Name: </h5>
                                        <input placeholder="Enter your college name" name="college" onChange={handleChange} values={values.college} />
                                        <h3>{errors.college} </h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <h5>City: </h5>
                                        <select name="city" onChange={handleChange} value={values.city}>
                                            <option value="-1">Please select a city</option>
                                            {cities.map((x) => {
                                                return <option key={x.id} value={x.id}>{x.name}</option>
                                            })}
                                        </select>
                                        <h3>{errors.city ? errors.city : null} </h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <h5>Department </h5>
                                        <input placeholder="Enter your Department" name="department" onChange={handleChange} values={values.department} />
                                        <h3>{errors.department}</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 form-group">
                                        <h5>Contact Number: </h5>
                                        <input placeholder="Enter your Contact number" name="phonenumber" onChange={handleChange} values={values.phonenumber} />
                                        <h3> {errors.phonenumber} </h3>
                                    </div>
                                </div>
                                <button className="btn btn-success"  >Submit </button> <br></br> <br></br>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {Details}
        </div>
    )
}
