import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import UpdatePost from "./UpdatePost";
import { useState } from "react";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// Displaying all posts currently in the database
// Mapping through objects and rendering an instance for each

const PostDetails = ({ post }) => {
  const { dispatch } = usePostsContext();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthContext();

  console.log(user)

  // DELETE button for each object

  const handleclick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/posts/" + post._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POST", payload: json });
    }
  };

  return (
    <div className="postDetails">
      <h4 className="postTitle">{post.title}</h4>
      <img className="postImage" src={post.selectedImage} alt="Cafe" />
      <p className="postText">{post.description}</p>
      <p className="postLocation">
        {post.location}
      </p>
      <p className="review">"{post.review}"</p>
      <p className="posted">
        <strong>posted </strong>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      {user.user.role == "admin" && (
      <div>
        <button
          className="material-symbols-outlined"
          onClick={handleclick}
          style={{ margin: "10px 5px" }}
        >
          delete
        </button>
        <button
          className="material-symbols-outlined"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          edit
        </button>
        {openModal && (
          <UpdatePost postId={post._id} post={post} closeModal={setOpenModal} />
        )}
      </div>
      )}
    </div>
  );
};
export default PostDetails;
