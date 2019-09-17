import streams from '../apis/streams';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues) => async(dispatch) => {
    const response = await streams.post('/streams', formValues);
    const { data } = response;

    dispatch({
        type: CREATE_STREAM,
        payload: data
    });
};

export const fetchStreams = () => async(dispatch) => {
    const response = await streams.get('/streams');
    const { data } = response;

    dispatch({
        type: FETCH_STREAMS,
        payload: data
    });
};

export const fetchStream = (id) => async(dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    const { data } = response;

    dispatch({
        type: FETCH_STREAM,
        payload: data
    });
};

export const editStream = (id, formValues) => async(dispatch) => {
    const response = await streams.put(`/streams/${id}`, formValues);
    const { data } = response;

    dispatch({
        type: EDIT_STREAM,
        payload: data
    });
};

export const deleteStream = (id) => async(dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({
        type: DELETE_STREAM,
        payload: id
    });
};