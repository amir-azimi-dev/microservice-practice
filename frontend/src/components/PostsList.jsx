import {useState} from "react";

const PostsList = ({posts}) => {

    return (
        <div>
            <h1 className="text-3xl pb-2 border-b">Post List</h1>
            <div className="grid grid-cols-3 gap-6">
                {posts.map(post => (
                    <div
                        key={post.id}
                        className="bg-sky-500 m-3 px-3 py-1.5 text-stone-50 rounded-md"
                    >
                        {post.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostsList
