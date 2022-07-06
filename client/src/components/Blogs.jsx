import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import Loader from './Assets/Loader'


const Blogs = () => {

    const [loaderValue, setLoaderValue] = useState(false)

    const params = useParams()
    const { id } = params

    const Navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [blog, setBlog] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")

    const fetchApiData = async () => {
        setLoaderValue(true)
        const resp = await fetch(`/api/blogs/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        setLoaderValue(false)
        const data = await resp
        const jsonData = await data.json()
        const status = data.status
        if (status === 200) {
            setTitle(jsonData.title)
            setBlog(jsonData.blog)
            setCategory(jsonData.category)
            setAuthor(jsonData.author)
        } else {
            Navigate('/')
        }

    }

    useEffect(() => {
        fetchApiData()
    }, []);

    return (
        <>
            <div className='dashboard_container home_container'>
                <Link to='/' className='logo'>Healthify</Link>
                {loaderValue && <Loader />}
                <h1 className='title'>{title}</h1>
                <p className='article'>{blog}</p>
                <span className='category'>Category - {category}</span>
                <span className='author'>By - {author}</span>
            </div>

        </>
    );
}

export default Blogs;
