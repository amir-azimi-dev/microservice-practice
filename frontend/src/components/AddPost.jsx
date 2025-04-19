import {useState} from "react";

const AddPost = ({getPosts}) => {
    const [title, setTitle] = useState("");

    const createPostHandler = async event => {
        event.preventDefault();
        if (!title.trim().length) return;

        const response = await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title})
        })

        if (!response.ok) {
            alert("Error while creating Post");
        }

        getPosts();
        setTitle("");
    }

    return (
        <form
            className="max-w-xl mx-auto my-10 bg-gradient-to-br from-sky-300 via-sky-600 to-sky-500 text-stone-50 p-5 rounded-lg shadow-xl"
            onClick={createPostHandler}
        >
            <h1 className="text-3xl pb-2 border-b">Add new POST</h1>
            <div className="flex flex-col gap-y-1 my-4">
                <label htmlFor="title">Post Title</label>
                <input
                    id="title"
                    type="text"
                    placeholder="title of post ..."
                    className="px-2 py-1 border border-gray-300 focus:border-gray-200 focus:outline-none rounded-sm"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
            </div>
            <button
                className="px-4 py-1.5 text-stone-50 border border-stone-50 rounded-lg transition-colors cursor-pointer hover:bg-stone-50 hover:text-sky-500"
            >
                Add Post
            </button>
        </form>
    )
}

export default AddPost
