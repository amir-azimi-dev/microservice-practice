import {useEffect, useState} from "react";
import AddComment from "./AddComment.jsx";

const PostsList = ({posts, getPosts}) => {
    return (
        <div>
            <h1 className="text-3xl pb-2 border-b">Post List</h1>
            <div className="grid grid-cols-3 gap-6">
                {posts.map(post => (
                    <div
                        key={post.id}
                        className="bg-sky-500 m-3 px-3 py-1.5 text-stone-50 rounded-md"
                    >
                        <h3 className="text-2xl pb-2 mb-5 border-b">{post.title}</h3>
                        <AddComment postId={post.id} updatePosts={getPosts}/>

                        <div className="mb-3">
                            <h3 className="text-2xl pb-2 mb-5 border-b">Comments</h3>

                            <ul className="list-disc pl-5">
                                {post.comments.map(commentData => (
                                    <li key={commentData.id}>{commentData.comment}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostsList
