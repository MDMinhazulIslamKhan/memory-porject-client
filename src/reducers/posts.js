import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/actionType";

const posts = (posts = [], action) => {
    switch (action.type) {
        case UPDATE:
            return posts.map(post => (post._id === action.payLoad._id ? action.payLoad : post));
        case FETCH_ALL:
            return action.payLoad;
        case CREATE:
            return [...posts, action.payLoad];
        case DELETE:
            return posts.filter((post) => post._id !== action.payLoad);
        case LIKE:
            return posts.map(post => (post._id === action.payLoad._id ? action.payLoad : post));
        default:
            return posts;
    }
};

export default posts;