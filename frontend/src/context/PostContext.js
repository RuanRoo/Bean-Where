import { createContext, useReducer } from "react";

// Using Context to share values between components without having to explicitly pass a prop through every level of the tree.

export const PostsContext = createContext()

// Using Reducer hook to take current state and an action as arguments, and return a new state result

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POST':
            return{
                posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST' :
            return {
                posts: state.posts.filter((w) => w._id !== action.payload._id)
            }
            case 'UPDATE_POST' :
            return {
                posts: state.posts.filter((e) => e._id !== action.payload._id)
            }
            case 'SET_POST' :
            return {
                posts: state.posts.filter((e) => e._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PostsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: null
    })

    return (
        <PostsContext.Provider value={{...state, dispatch}}>
            { children  }
        </PostsContext.Provider>
    )
}