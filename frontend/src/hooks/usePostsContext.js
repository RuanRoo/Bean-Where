import { PostsContext } from "../context/PostContext";
import { useContext } from "react";

// Using Context to share values between components without having to explicitly pass a prop through every level of the tree.

export const usePostsContext = () => {
    const context = useContext(PostsContext)

    if (!context) {
        throw Error('usePostsContext must be used inside a PostsContextProvider')
    }

    return context
}