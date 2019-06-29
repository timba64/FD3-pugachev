import type from '../types'

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: type.LOGIN_SUCCESS });
        }).catch((err) => {
            dispatch({ type: type.LOGIN_ERROR, err });
        });
  
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
    
        firebase.auth().signOut().then(() => {
            dispatch({ type: type.SIGNOUT_SUCCESS });
        });
    }
}

export const signUp = newUser => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(resp => {
            return firestore
            .collection("users")
            .doc(resp.user.uid)
            .set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            });
        }) // we make a record of a new user in the new collection called 'users'
        .then(() => {
            dispatch({ type: type.SIGNUP_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: type.SIGNUP_ERROR, err });
        });
  };
};