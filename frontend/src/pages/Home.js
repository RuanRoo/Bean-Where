import { useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PostDetails from "../Components/PostDetails";
import AddPostForm from "../Components/AddPostForm";
import NavBar from "../Components/NavBar";
import About from "../Components/About";

// Home page that fetches all posts from database and displaying them using the PostDetails component

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  return (
    <div>
      <NavBar />
      <div>
        <div  className="PostsContainer">
          {posts &&
            posts.map((post) => <PostDetails key={post._id} post={post} />)}
        </div>
        <AddPostForm />
        <About />
      </div>
    </div>
  );
};
export default Home;
