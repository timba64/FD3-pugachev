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
          type: "CREATE_AUTO", //  надо изменить на CREATE_AUTO_SUCCESS
          project: auto
        });
      })
      .catch(err => {
        dispatch({ type: "CREATE_AUTO_ERROR", err });
      });
    }
};

export const deleteAuto = (auto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
    // initializing functions to reference firebase
    const firestore = getFirestore();

    // this below is asyncronous
    firestore
      .collection("autos")
      .doc(auto.id)
      .delete()
      .then(() => {
        dispatch({
          type: "DELETE_AUTO_SUCCESS",
          project: auto
        });
      })
      .catch(err => {
        dispatch({ type: "DELETE_AUTO_ERROR", err });
      });
    }
};