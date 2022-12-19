import * as api from '../api/index.js';
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from '../constants/actionType.js';

export const getPosts = (page, size) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(page, size);

        dispatch({ type: FETCH_ALL, payLoad: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({
            type: CREATE,
            payLoad: data
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payLoad: data })
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payLoad: id })
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payLoad: data });
    } catch (error) {
        console.log(error.message);
    }
};