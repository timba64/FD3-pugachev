export const createAuto = (auto) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
    // initializing functions to reference firebase
    const firestore = getFirestore();

    // this below is asyncronous
    firestore
      .collection("autos")
      .add({
        ...auto,
        authorFirstName: "san",
        authorLastName: "San san",
        authorId: 12345,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: "CREATE_AUTO",
          project: auto
        });
      })
      .catch(err => {
        dispatch({ type: "CREATE_AUTO_ERROR", err });
      });
    }
};