const initState = {
    loading: false
  }

const asyncReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ASYNC_ACTION_ERROR':
            console.log('async action error', action.err);
            return {...state, loading: false};
        case 'ASYNC_ACTION_START':
            console.log('async action start');
            return {...state, loading: true};
        case 'ASYNC_ACTION_FINISH':
            console.log('async action finish');
            return {...state, loading: false};
        default:
            return {...state};
    }
};

export default asyncReducer;