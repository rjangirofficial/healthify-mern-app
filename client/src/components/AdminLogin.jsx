import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {

    const Successnotify = (msg) => toast.success(msg);
    const Errornotify = (msg) => toast.error(msg);

    const Navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formHandler = async (e) => {
        e.preventDefault()
        const resp = await fetch('/api/admin/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await resp
        const status = data.status
        const jsonData = await data.json()
        if (status === 200) {
            localStorage.setItem("token", JSON.stringify(jsonData['token']))
            Navigate('/admin/dashboard')
            Successnotify("Login Successful")
        } else {
            Errornotify(jsonData['msg'])
        }
    }

    const verify = () => {
        const storageData = JSON.parse(localStorage.getItem('token'))
        if (storageData) {
            Navigate('/admin/dashboard')
        }
    }

    useEffect(() => {
        verify()
    }, []);

    return (
        <>
            <div className='login_container'>
                <form onSubmit={formHandler}>
                    <h1>Admin Login</h1>
                    <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />
                    <input required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                    <button>Login</button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default AdminLogin;
