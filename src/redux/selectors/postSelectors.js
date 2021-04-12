import { createSelector } from 'reselect';

export function getFetchingStatus(state) {
  return state.posts.isFetching;
}

export const getPosts = createSelector(
  function(state) { return state.posts.data },
  function(data) { return data.map(d => d.post) }
)

export const getPostComments = createSelector(
  function(state) { return state.posts.data },
  function(data) { 
    const result = [];
    data.forEach(d => d.comments.forEach(c => result.push(c)));
    return result;
  }
)
