import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const AddPostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  // Updating state

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    // Posting new post to express

    let myForm = document.getElementById('postForm');
    let formData = new FormData(myForm);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    // if response is succesful, we update state to empty strings
    if (response.ok) {
      setTitle("");
      setImage("");
      setDescription("");
      setLocation("");
      setReview("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_POST", payload: json });
    }
  };

  return (
    <div className="addPostContainer">
      <form
      id="postForm"
        className="addPostForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h3>Add your favourite eatery</h3>
        <div className="inputGroup">
          <label>Title:</label>
          <input
            name="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
          />
        </div>
        <div className="inputGroup">
          <label>Description:</label>
          <input
          name="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes("description") ? "error" : ""}
          />
        </div>
        <div className="inputGroup">
          <label>Location:</label>
          <input
          name="location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className={emptyFields.includes("location") ? "error" : ""}
          />
        </div>
        <div className="inputGroup">
          <label>Review:</label>
          <input
            type="text"
            name="review"
            onChange={(e) => setReview(e.target.value)}
            value={review}
            className={emptyFields.includes("review") ? "error" : ""}
          />
        </div>
        <div className="inputFile">
          <input
            name="image"
            type="file"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className={emptyFields.includes("image") ? "error" : ""}
          />
        </div>
        <button className="loginButton">Add Post</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AddPostForm;
