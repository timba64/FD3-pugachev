import type from '../types';
import firebase from "../../config/fbconfig";

export const createAuto = (auto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
    // initializing functions to reference firebase
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    // this below is asyncronous
    firestore
        .collection("autos")
        .add({
            ...auto,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        })
        .then(() => {
            dispatch({
            type: type.CREATE_AUTO_SUCCESS,
            project: auto
            });
        })
        .catch(err => {
            dispatch({ type: type.CREATE_AUTO_ERROR, err });
        });
    }
};

export const editAuto = (auto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
    // initializing functions to reference firebase
    const firestore = getFirestore();
    firestore
        .collection("autos")
        .doc(auto.id)
        .update(auto)
        .then(() => {
            dispatch({
            type: type.EDIT_AUTO_SUCCESS,
            project: auto
            });
        })
        .catch(err => {
            dispatch({ type: type.EDIT_AUTO_ERROR, err });
        });
    }
};

export const deleteAuto = (auto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
    // initializing functions to reference firebase
    const firestore = getFirestore();
    firestore
        .collection("autos")
        .doc(auto.id)
        .delete()
        .then(() => {
            dispatch({
            type: type.DELETE_AUTO_SUCCESS,
            project: auto
            });
        })
        .catch(err => {
            dispatch({ type: type.DELETE_AUTO_ERROR, err });
        });
    }
};

export const getAutosForDashboard = (lastAuto) => async (dispatch, getState) => {

    const firestore = firebase.firestore();
    const autosRef = firestore.collection('autos');
    try {
        dispatch({type: type.ASYNC_ACTION_START});
        let startAfter =
            lastAuto &&
            (await firestore
                .collection('autos')
                .doc(lastAuto.id)
                .get());

        let query;

        lastAuto
            ? ( query = autosRef
                .startAfter(startAfter)
                .limit(3))
            : ( query = autosRef
                .limit(3));

        let querySnap = await query.get();

        if (querySnap.docs.length === 0) {
            dispatch({type: type.ASYNC_ACTION_FINISH});
            return querySnap;
        }

        let autos = [];

        for (let i = 0; i < querySnap.docs.length; i++) {
            let avt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            autos.push(avt);
        }
        dispatch({
            type: type.FETCH_AUTOS,
            payload: {autos} });

        dispatch({ type: type.ASYNC_ACTION_FINISH});

        return querySnap;

    } catch (error) {
        console.log(error);
        dispatch({type: type.ASYNC_ACTION_ERROR, error});
    }
};