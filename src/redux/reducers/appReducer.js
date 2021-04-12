import { requestPosts } from "./postReducer";

const INITIALIZE_APP = "INITIALIZE_APP";

const initState = {
  initialized: false
}

function appReducer(state = initState, action) {
  switch (action.type) {
    case INITIALIZE_APP:
      return { ...state, initialized: true }
    default:
      return state;
  }
}

function initialize() { return { type: INITIALIZE_APP } }

export function initializeApp() {
  return function(dispatch) {
    dispatch(requestPosts()).then(() => dispatch(initialize()))
  }
}

export default appReducer;