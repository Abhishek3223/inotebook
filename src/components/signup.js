import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {


    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("abt to fectching ");
        console.log({
            email: (credentials.email)[0],
            password: (credentials.password)[0],
            name: (credentials.username)[0]
        });
        // console.log({ email: credentials.email, password: credentials.password });

        const response = await fetch("http://localhost:5000/api/auth/CreatUSER", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: (credentials.email)[0],
                    password: (credentials.password)[0],
                    name: (credentials.username)[0]
                })
        });

        const json = await response.json()
        console.log(json);

        if (json.Success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.ShowAlerts("succcessfully Siggned In", "success")
            navigate('/')

        }
        else {
            props.ShowAlerts("Invalid credentials", "danger")
        }
    }
    const onchange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: [e.target.value]
        })
        // console.log(credentials);
    }
    return (
        <div className='container my-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"> UserNameaddress</label>
                    <input type="text" onChange={onchange} className="form-control" name="username" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" onChange={onchange} className="form-control" name="email" id="exampleInputEmail2" aria-describedby="emailHelp" />

                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onchange} className="form-control" name="password" id="exampleInputPassword1" />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" onChange={onchange} className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1" >Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup