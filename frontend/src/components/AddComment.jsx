import {useState} from "react";

const AddComment = ({postId, updateComments}) => {
    const [comment, setComment] = useState("");

    const insertCommentHandler = async event => {
        event.preventDefault();
        if (!comment.trim().length) return;

        const response = await fetch(`http://localhost:3001/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({comment})
        })

        if (!response.ok) {
            alert("Error while inserting your Comment!");
        }

        updateComments();
        setComment("");
    }

    return (
        <form
            className="max-w-xl mx-auto mb-10 p-4 border rounded-lg"
            onClick={insertCommentHandler}
        >
            <h1 className="text-lg pb-2 border-b">Insert your Comment</h1>
            <div className="flex flex-col gap-y-1 my-4">
                <label htmlFor="comment">comment</label>
                <input
                    id="comment"
                    type="text"
                    placeholder="your comment ..."
                    className="px-2 py-1 border border-gray-300 focus:border-gray-200 focus:outline-none rounded-sm"
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                />
            </div>
            <button
                className="px-4 py-1.5 text-stone-50 border border-stone-50 rounded-lg transition-colors cursor-pointer hover:bg-stone-50 hover:text-sky-500"
            >
                Insert Comment
            </button>
        </form>
    )
}

export default AddComment
