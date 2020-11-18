import Api from "../services/Api";

export default {
  getPosts() {
    return Api().get("posts");
  },
  getAllPosts() {
    return Api().get("post/all");
  },
  getPostById(id) {
    return Api().get("post/" + id);
  },
  createPost(data) {
    return Api().post("post/add", data);
  },
  updatePost(id, data) {
    return Api.put("post/" + id, data);
  },

  deletePost(id) {
    return Api().delete("post/" + id);
  },
  commentPost(id, data) {
    return Api().post("post/" + id + "/comments", data);
  },

  deleteComment(id) {
    return Api().delete("post/comments/" + id);
  },
};