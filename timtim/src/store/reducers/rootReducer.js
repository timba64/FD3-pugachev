import authReducer from "./authReducer";
import autoReducer from "./autoReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
    auth: authReducer,
    auto: autoReducer,
    firestore: firestoreReducer,
});

export default rootReducer;