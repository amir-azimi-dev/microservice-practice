import {useEffect, useState} from "react";
import AddComment from "./AddComment.jsx";

const PostsList = ({posts}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();

    }, [posts]);

    const getComments = async () => {
        const postsIds = posts.map(post => post.id);

        const comments = await Promise.all(postsIds.map(async postId => {
            const response = await fetch(`http://localhost:3001/${postId}`);
            if (!response.ok) {
                return;
            }

            const data = await response.json();
            return {
                postId,
                comments: data.comments
            };
        }));

        const manipulatedComments = comments.reduce((acc, current) => {
            return {
                ...acc,
                [current.postId]: current.comments
            };

        }, {});

        setComments(manipulatedComments);
    };

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
                        <AddComment postId={post.id} updateComments={getComments}/>

                        <div className="mb-3">
                            <h3 className="text-2xl pb-2 mb-5 border-b">Comments</h3>

                            <ul className="list-disc pl-5">
                                {comments[post.id]?.map(commentData => (
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
