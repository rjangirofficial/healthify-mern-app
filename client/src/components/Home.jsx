import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const Home = () => {


    const [blogs, setBlogs] = useState([])

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

    useEffect(() => {
        fetchApiData()
    }, []);

    return (

        <div className='dashboard_container home_container'>
            <Link to='/' className='logo'>Healthify</Link>

        {
            blogs.map((item, index) => {
                return (
                    <div key={index} className="blogs_container">
                        <h2>{item.title}</h2>
                        <span>Category - {item.category}</span>
                        <span className='home_author'>By - {item.author}</span>
                        <Link to={`/blogs/${item._id}`} className='read_btn'>Read Now</Link>
                    </div>
                )
            })
        }

    </div>

        
    );
}

export default Home;
