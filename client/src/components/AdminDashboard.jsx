import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {

    const Successnotify = (msg) => toast.success(msg);
    const Errornotify = (msg) => toast.error(msg);

    const Navigate = useNavigate()

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
        const resp = await fetch('/blogs', {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await resp
        const jsonData = await data.json()
        setBlogs(jsonData)
    }

    const formHandler = async (e) => {
        e.preventDefault()
        const storageData = JSON.parse(localStorage.getItem('token'))
        if (storageData) {
            const resp = await fetch('/admin/dashboard', {
                method: "POST",
                headers: {
                    "token": storageData,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, blog, category, author })
            })
            const data = await resp
            const status = data.status
            const jsonData = await data.json()
            if (status === 201) {
                Successnotify("Post Added Successfully")
                fetchApiData()
            } else {
               Errornotify("Failed To Add Post")
            }
        }
    }

    const deleteBlog = async (id) => {
        const storageData = JSON.parse(localStorage.getItem('token'))
        if (storageData) {
            const resp = await fetch(`/blogs/${id}`, {
                method: "DELETE",
                headers: {
                    "token": storageData,
                },
            })
            const data = await resp
            const status = data.status
            const jsonData = await data.json()
            if (status === 200) {
                fetchApiData()
                Successnotify("Deleted Successfully")
            } else {
                Errornotify("Failed To Delete Post")
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
                    <h1>Add Post</h1>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' />
                    <textarea onChange={(e) => setBlog(e.target.value)} type="text" placeholder='Blog' />
                    <input onChange={(e) => setCategory(e.target.value)} type="text" placeholder='Category' />
                    <input onChange={(e) => setAuthor(e.target.value)} type="text" placeholder='Author' />
                    <button>Add</button>
                </form>


                {
                    blogs.map((item, index) => {
                        return (
                            <div key={index} className="blogs_container">
                                <h2>{item.title}</h2>
                                <span>Category - {item.category}</span>
                                <span className='author_text'>By - {item.author}</span>
                                <button onClick={() => deleteBlog(item._id)} className='delete_btn'>Delete</button>
                                <Link to={`/admin/dashboard/edit/${item._id}`} className='update_btn'>Edit</Link>
                            </div>
                        )
                    })
                }

            </div>
            <ToastContainer />
        </>
    );
}

export default AdminDashboard;
