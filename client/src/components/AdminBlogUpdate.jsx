import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminBlogUpdate = () => {

    const Successnotify = (msg) => toast.success(msg);
    const Errornotify = (msg) => toast.error(msg);

    const Navigate = useNavigate()

    const params = useParams()
    const { id } = params

    const [title, setTitle] = useState("")
    const [blog, setBlog] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")

    const [blogs, setBlogs] = useState([])


    const verify = async () => {
        const storageData = JSON.parse(localStorage.getItem('token'))
        if (storageData) {
            const resp = await fetch('/verify', {
                method: "GET",
                headers: {
                    "token": storageData,
                    "Content-Type": "application/json"
                }
            })
            const data = await resp
            const status = data.status
            if (status === 200) {
                fetchApiData()
            } else {
                Navigate('/admin/login')
            }
        } else {
            Navigate('/admin/login')
        }
    }


    const fetchApiData = async () => {
        const storageData = JSON.parse(localStorage.getItem('token'))
        if (storageData) {
            const resp = await fetch(`/admin/dashboard/edit/${id}`, {
                method: "GET",
                headers: {
                    "token": storageData,
                    "Content-type": "application/json"
                }
            })
            const data = await resp
            const jsonData = await data.json()
            setTitle(jsonData.title)
            setBlog(jsonData.blog)
            setCategory(jsonData.category)
            setAuthor(jsonData.author)

        }
    }


    const formHandler = async (e) => {
        e.preventDefault()
        const storageData = JSON.parse(localStorage.getItem('token'))
        if (storageData) {
            const resp = await fetch(`/admin/dashboard/edit/${id}`, {
                method: "PUT",
                headers: {
                    "token": storageData,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, blog, category, author })
            })
            const data = await resp
            const status = data.status
            const jsonData = await data.json()
            if (status === 200) {
                Successnotify("Updated Successfully")
            } else {
                Errornotify("Failed To Update Post")
            }
        }
    }


    useEffect(() => {
        verify()
    }, []);



    return (
        <>
            <div className='dashboard_container'>
                <form onSubmit={formHandler}>
                    <h1>Edit Post</h1>
                    <input required onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Title' />
                    <textarea required onChange={(e) => setBlog(e.target.value)} value={blog} type="text" placeholder='Blog' />
                    <input required onChange={(e) => setCategory(e.target.value)} value={category} type="text" placeholder='Category' />
                    <input required onChange={(e) => setAuthor(e.target.value)} value={author} type="text" placeholder='Author' />
                    <button>Update</button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default AdminBlogUpdate;
