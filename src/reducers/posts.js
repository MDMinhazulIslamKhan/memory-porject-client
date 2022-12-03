const posts = (posts = [], action) => {
    switch (action.type) {
        case 'UPDATE':
            return posts.map(post => post._id === action.payLoad._id ? action.payLoad : post);
        case 'FETCH_ALL':
            return action.payLoad;
        case 'CREATE':
            return [...posts, action.payLoad];
        default:
            return posts;
    }
};

export default posts;