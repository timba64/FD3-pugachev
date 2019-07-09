const initState = {};

const autoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_AUTO_SUCCESS':
            console.log('create auto success', action.project.title);
            return state;
        case 'CREATE_AUTO_ERROR':
            console.log('create auto error', action.err);
            return state;
        case 'DELETE_AUTO_SUCCESS':
            console.log('delete auto success', action.project.title);
            return state;
        case 'DELETE_AUTO_ERROR':
            console.log('delete auto error', action.err);
            return state;
        case 'EDIT_AUTO_SUCCESS':
            console.log('edit auto success', action.project.title);
            return state;
        case 'EDIT_AUTO_ERROR':
            console.log('edit auto error', action.err);
            return state;
        case 'FETCH_AUTOS':
            console.log('fetch autos - ', action.payload.autos);
            return action.payload.autos;
        default:
            return state;
    }
};
  
export default autoReducer;