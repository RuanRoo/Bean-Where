import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Using Context to share values between components without having to explicitly pass a prop through every level of the tree.

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthsContext must be used inside a AuthContextProvider')
    }

    return context
}