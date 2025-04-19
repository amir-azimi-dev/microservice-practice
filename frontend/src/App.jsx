import {useEffect, useState} from "react";
import AddPost from "./components/AddPost.jsx";
import PostsList from "./components/PostsList.jsx";

const App = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
    }, []);

    const getPosts = async () => {
        const response = await fetch("http://localhost:3000");
        if (!response.ok) {
            alert("Error while getting Posts");
        }

        const data = await response.json();
        setPosts(data.posts);
    };

    return (
        <div className="container mx-auto font-bold ">
            <AddPost getPosts={getPosts}/>
            <PostsList posts={posts} />
        </div>
    )
}

export default App
