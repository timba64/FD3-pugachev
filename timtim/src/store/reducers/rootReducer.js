import authReducer from "./authReducer";
import autoReducer from "./autoReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
    auto: autoReducer,
    firestore: firestoreReducer,
    //this reducer is for collections from firestore
    firebase: firebaseReducer
    //this reducer is for auth with firebase
});

export default rootReducer;