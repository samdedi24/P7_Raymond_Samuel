import Api from "../services/Api";

export default {
  getPosts() {
    return Api().get("posts");
  },
  getAllPosts() {
    return Api().get("posts/all");
  },
  getPostById(id) {
    return Api().get("posts/" + id);
  },
  createPost(data) {
    return Api().post("posts/add", data);
  },
  updatePost(id, data) {
    return Api.put("posts/" + id, data);
  },
  deletePost(id) {
    return Api().delete("posts/" + id);
  },
  addComment(id, data) {
    return Api().post("posts/" + id + "/comments", data);
  },
  deleteComment(id) {
    return Api().delete("posts/comments/" + id);
  },
};