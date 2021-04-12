import { postAPI } from './../../api/api'

const SET_POSTS = "SET_POSTS";
const SET_COMMENTS = "SET_COMMENTS";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";

const initState = {
  data: [],
  isFetching: false
}

function postReducer(state = initState, action) {
  switch(action.type) {
    case SET_POSTS:
      const data = action.posts.map(p => ({ post: p, comments: [] }))
      return { ...state, data: [...state.data, ...data] }
    case SET_COMMENTS: {
      const postId = action.comments[0].postId;
      const data = state.data.map(d => {
        if (d.post.id === postId) {
          return { ...d, comments: [...action.comments] }
        }
        return d;
      })
      return { ...state, data: [...data] }
    }
    case TOGGLE_FETCHING:
      return { ...state, isFetching: !state.isFetching }
    default:
      return state;
  }
}

function setPosts(posts) { return { type: SET_POSTS, posts } }

function setComments(comments) { return { type: SET_COMMENTS, comments } }

function toggleFetching() { return { type: TOGGLE_FETCHING } }

export function requestPosts() {
  return function(dispatch) {
    return postAPI.getPosts().then(posts => {
      dispatch(setPosts(posts));
    })
  }
}

export function requestComments(postId) {
  return function(dispatch) {
    dispatch(toggleFetching());
    postAPI.getPostComments(postId).then(comments => {
      dispatch(setComments(comments));
      dispatch(toggleFetching());
    })
  }
}

export default postReducer;