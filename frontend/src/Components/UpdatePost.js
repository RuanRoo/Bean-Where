import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Modal that pops up with all the fields that can be edited
// New values is stored in state and PATCHed to the backend
// Objects are identified by ID to update informtation

const UpdatePost = ({ closeModal, postId, post }) => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [location, setLocation] = useState(post.location)
  const [review, setReview] = useState(post.review);
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {


    if (!user) {
      setError("You must be logged in");
      return;
    }

    const post = { title, description, location, review };
    console.log(error)

    const update = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await update.json();

    if (update.ok) {
      dispatch({ type: "UPDATE_POST", payload: json });
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <form className="updateForm" onSubmit={handleSubmit}>
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            {" "}
            X{" "}
          </button>
          <h3>Admin Changes</h3>
          <label>Title: </label> <br />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          /> <br />
          <br />
          <label>Description: </label> <br />
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          /> <br />
          <br />
          <label>Location: </label> <br />
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            /> <br />
            <br />
          <label>Review: </label> <br />
          <input
            type="text"
            onChange={(e) => setReview(e.target.value)}
            value={review}
          /> <br />
          <br />
          <button
            className="modalButtons"
            onClick={() => {
              closeModal(false);
            }}
          >
            Cancel
          </button>{" "}
          <button className="modalButtons">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
