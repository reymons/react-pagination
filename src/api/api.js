const BASE_URL = "https://jsonplaceholder.typicode.com";

export const postAPI = {
  getPosts() {
    return fetch(BASE_URL + "/posts").then(res => res.json());
  },
  getPostComments(postId) {
    return fetch(`${BASE_URL}/posts/${postId}/comments`).then(res => res.json());
  }
}