// const initState = {
//     autos: [
//       { id: "1", title: "BMW-320", content: "1998y, 3.0, blue, super state, 5000$" },
//       { id: "2", title: "Mercedes-s500", content: "2007y, 5.0, white, full options, leather interior, 4000$" },
//       { id: "3", title: "Volkswagen Passat", content: "2008y, 2.0turbo, red, full options, super state, 6000$" }
//     ]
//   };

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
      case 'ASYNC_ACTION_ERROR':
        console.log('async action error', action.err);
        return {...state};
      case 'ASYNC_ACTION_START':
        console.log('async action start');
        return {...state};
      case 'ASYNC_ACTION_FINISH':
        console.log('async action finish');
        return {...state};
      case 'FETCH_AUTOS':
        console.log('fetch autos - ', action.payload.autos);
        return action.payload.autos;
      default:
        return state;
    }
  };
  
  export default autoReducer;